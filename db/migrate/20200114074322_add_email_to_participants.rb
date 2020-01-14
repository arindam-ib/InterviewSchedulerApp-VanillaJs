class AddEmailToParticipants < ActiveRecord::Migration[5.1]
  def change
    add_column :participants, :email, :string
  end
end
