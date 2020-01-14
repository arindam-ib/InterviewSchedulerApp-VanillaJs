module Api::V1
  class ParticipantsController < ApiController

    def index
      @participants = Participant.all
      render json:@participants
    end

    def new
      @participant = Participant.new
      head :no_content
    end

    def create
      @participant = Participant.create(participant_params)
      render json:@participant
      head :created
    end

    def show
      @participant = Participant.find(params[:id])
      render json:@participant
    end

    private

      def participant_params
        params.permit(:name, :email)
      end

  end
end
