class Interview < ApplicationRecord
  validate :no_overlap
  has_and_belongs_to_many :participants
  mount_uploader :attachment, AttachmentUploader # Tells rails to use this uploader for this model.


  def no_overlap
    for participant in participants
      allinterviews = participant.interviews
      allinterviews.each do |interview|
        thatStart = DateTime.new(interview.starttime.year,interview.starttime.month,interview.starttime.day,interview.starttime.hour,interview.starttime.min,interview.starttime.sec,interview.starttime.zone).utc.to_i
        thatEnd = DateTime.new(interview.endtime.year,interview.endtime.month,interview.endtime.day,interview.endtime.hour,interview.endtime.min,interview.endtime.sec,interview.endtime.zone).utc.to_i
        thisStart = DateTime.new(starttime.year,starttime.month,starttime.day,starttime.hour,starttime.min,starttime.sec,starttime.zone).utc.to_i
        thisEnd = DateTime.new(endtime.year,endtime.month,endtime.day,endtime.hour,endtime.min,endtime.sec,endtime.zone).utc.to_i
        if (thatStart..thatEnd).overlaps?(thisStart..thisEnd) and id != interview.id
          errors.add(participant.id.to_s, " is already scheduled for an interview at that time")
        end
      end
    end
  end
end
