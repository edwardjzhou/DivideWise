class Comment < ApplicationRecord
    validates :user_id, :bill_id, :body, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: "User"

    belongs_to :bill,
    foreign_key: :bill_id,
    class_name: "User"
    
end

    # t.integer "user_id", null: false
    # t.integer "bill_id", null: false
    # t.string "body", null: false
    # t.datetime "created_at", null: false
    # t.datetime "updated_at", null: false
    # t.index ["bill_id"], name: "index_comments_on_bill_id"
    # t.index ["user_id"], name: "index_comments_on_user_id"