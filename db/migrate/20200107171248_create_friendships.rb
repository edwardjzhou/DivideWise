class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.string :user_one_id, null: false
      t.string :user_two_id, null: false

      t.timestamps
    end
    add_index :friendships, [:user_one_id, :user_two_id], unique: true
  end
end
