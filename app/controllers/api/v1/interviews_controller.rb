module Api::V1
  class InterviewsController < ApiController
    before_action :get_interview, only: [:show, :edit, :update, :destroy]

    def index
      @interviews = Interview.all
      render :json => @interviews, :include => [:participants]
    end

    def new
      @interview = Interview.new
      head :no_content
    end

    def create
      # puts interview_params.inspect
      @interview = Interview.new(interview_params)
      params[:participant_ids].each do |participant_id|
        if participant_id != ""
          participant = Participant.where(:email => participant_id)
          if participant.count != 0
            @interview.participants << participant
          else
            participant2 = Participant.new(:name => participant_id, :email => participant_id)
            if participant2.save
              @interview.participants << participant2
            end
          end
        end
      end
      if @interview.save
        t = @interview.starttime
        start = DateTime.new(t.year,t.month,t.day,t.hour,t.min,t.sec).utc.to_i
        current = Time.now
        current = DateTime.new(current.year,current.month,current.day,current.hour,current.min,current.sec).utc.to_i
        participants = @interview.participants
        emails = []
        participants.each do |p|
          emails += [p.email]
          SchedulerMailer.created_email(p.email).deliver_now
        end
        # puts emails
        SchedulerWorker.perform_at((start-current-1800).seconds,emails,@interview.id)
        # format.html { redirect_to @interview, notice: 'Interview was successfully created.' }
        render :json => @interview, :include => [:participants]
        # render json:@interview
      else
        render json: @interview.errors
      end

      # @params_old = params.require(:interview).permit(:title, :starttime, :endtime, :docs)
      # puts @params_old
      # @params_new = params.require(:interview).permit(:title, :starttime, :endtime, :docs, :participant_ids => [])
      # puts @params_new
      # @participant_ids = @params_new["participant_ids"]
      # puts @participant_ids[1].to_i
      # @participant_1 = Participant.find(id=@participant_ids[1].to_i)
      # puts @participant_1.id
      # @interview = @participant_1.interviews.create(title: @params_old["title"], starttime: @params_old["starttime"], endtime: @params_old["endtime"], docs: @params_old["docs"])
      #@interview = Interview.create(@params_old)
    end

    def show
      render :json => @interview, :include => [:participants]
    end

    def edit
      @participants = Participant.all
      head :no_content
    end

    def update
      #puts interview_params.inspect
      @interview.participants.clear
      params[:participant_ids].each do |participant_id|
        if participant_id != ""
          participant = Participant.where(:email => participant_id)
          if participant.count != 0
            @interview.participants << participant
          else
            participant2 = Participant.new(:name => participant_id, :email => participant_id)
            if participant2.save
              @interview.participants << participant2
            end
          end
        end
      end
      if @interview.update(interview_params)
        participants = @interview.participants
        t = @interview.starttime
        start = DateTime.new(t.year,t.month,t.day,t.hour,t.min,t.sec).utc.to_i
        current = Time.now
        current = DateTime.new(current.year,current.month,current.day,current.hour,current.min,current.sec).utc.to_i
        emails = []
        participants.each do |p|
          emails += [p.email]
          SchedulerMailer.update_email(p.email).deliver_now
        end
        SchedulerWorker.perform_at((start-current-1800).seconds,emails,@interview.id)
        # format.html { redirect_to @interview, notice: 'Interview was successfully updated.' }
        # render json:@interview
        render :json => @interview, :include => [:participants]
      else
        # format.html { render :edit }
        render json:@interview.errors
      end

    end

    def destroy
      # participants = @interview.participants
      # emails = []
      # participants.each do |p|
      #   emails += [p.email]
      #   SchedulerMailer.delete_email(p.email).deliver_now
      # end
      @interview.destroy
        # format.html { redirect_to @interview, notice: 'Interview was successfully destroyed.' }
      head :no_content
    end

    private

      def get_interview
        @interview = Interview.find(params[:id])
      end

      def interview_params
        params.permit(:title, :starttime, :endtime, :attachment)
      end
  end
end
