class Bill < ApplicationRecord
    # https://api.rubyonrails.org/classes/ActiveRecord/Scoping/Named/ClassMethods.html
    # scope :ofMine, -> { where()}

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

#  scope :red, -> { where(color: 'red') }
#   scope :dry_clean_only, -> { joins(:washing_instructions).where('washing_instructions.dry_clean_only = ?', true) }
    # https://api.rubyonrails.org/classes/ActiveRecord/Scoping/Named/ClassMethods.html
    def self.involved
    #    if !Friendship.where("user_one_id = ? OR user_two_id = ?", @bill.lender_id.to_s, @bill.lender_id.to_s)
    #         .where("user_one_id = ? OR user_two_id = ?", @bill.borrower_id.to_s, @bill.borrower_id.to_s)
    #         render json: ["become friends first before creating a bill with others"]
    #     elsif current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
    #         render json: ["not a bill you're involved in"]
    #     elsif @bill.save
    #         render "api/bills/show"
    #     else
    #         render json: @bill.errors.full_messages, status:422
    #     end
        # return current_user
    end

            # @bills = Bill.all.where("lender_id = #{current_user.id.to_s} OR borrower_id = #{current_user.id.to_s}" )


end