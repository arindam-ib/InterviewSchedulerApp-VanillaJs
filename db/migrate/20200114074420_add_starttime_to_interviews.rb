class AddStarttimeToInterviews < ActiveRecord::Migration[5.1]
  def change
    add_column :interviews, :starttime, :datetime
  end
end
