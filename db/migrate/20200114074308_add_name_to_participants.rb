class AddNameToParticipants < ActiveRecord::Migration[5.1]
  def change
    add_column :participants, :name, :string
  end
end
