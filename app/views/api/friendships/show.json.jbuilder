json.extract! @friendship, :id, :user_one_id, :user_two_id
    if @friendship.user_one.username != current_user.username
        json.friends_name @friendship.user_one.username
    else 
        json.friends_name @friendship.user_two.username
    end