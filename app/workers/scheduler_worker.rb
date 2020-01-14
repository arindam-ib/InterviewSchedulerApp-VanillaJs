class SchedulerWorker
  include Sidekiq::Worker
  def perform(emails, interviewid)
    interview1 = Interview.find(id=interviewid)
    if interview1 != nil
      t = interview1.starttime
      start = DateTime.new(t.year,t.month,t.day,t.hour,t.min,t.sec).utc.to_i
      current = Time.now
      current = DateTime.new(current.year,current.month,current.day,current.hour,current.min,current.sec).utc.to_i
      if (start-current) >= 1730 and (start-current) <= 1800
        emails.each do |e|
          SchedulerMailer.sample_email(e).deliver_now
        end
      end
    end
  end
end
