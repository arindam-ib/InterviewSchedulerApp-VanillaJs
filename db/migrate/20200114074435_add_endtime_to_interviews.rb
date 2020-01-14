class AddEndtimeToInterviews < ActiveRecord::Migration[5.1]
  def change
    add_column :interviews, :endtime, :datetime
  end
end
