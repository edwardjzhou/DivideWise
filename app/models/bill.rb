class Bill < ApplicationRecord
#   after_initialize :ensure_session_token
    belongs_to :borrower,
    foreign_key: "borrower_id",
    class_name: "User"

    belongs_to :lender,
    foreign_key: "lender_id",
    class_name: "User"
    
    validates :description, :lender_id, :borrower_id, :amount, :settled, presence: true

end