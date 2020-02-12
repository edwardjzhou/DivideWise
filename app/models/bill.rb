class Bill < ApplicationRecord
#   after_initialize :ensure_session_token

    validates :description, :lender_id, :borrower_id, :amount, presence: true
    validates :settled, :inclusion => { :in => [true, false] }

    belongs_to :borrower,
    foreign_key: :borrower_id,
    class_name: "User"

    belongs_to :lender,
    foreign_key: :lender_id,
    class_name: "User"
    
    has_many :payments,
    foreign_key: :bill_id,
    class_name: 'Payment'
end