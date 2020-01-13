json.array! (@friendships) do |friendship|
    json.extract! friendship, :user_one_id, :user_two_id

end
