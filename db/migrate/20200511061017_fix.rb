class Fix < ActiveRecord::Migration[5.2]
  def change
    change_column :friendships, :user_one_id, 'integer USING CAST(user_two_id AS integer)'
    change_column :friendships, :user_two_id, 'integer USING CAST(user_two_id AS integer)'

  end
end
