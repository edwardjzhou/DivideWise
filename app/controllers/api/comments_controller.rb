    # HOWTO:
    # Update just one field for example use update_all

    
    # validates :user_id, :bill_id, :body, presence: true

    # belongs_to :user,
    # foreign_key: :user_id,
    # class_name: "User"

    # belongs_to :bill,
    # foreign_key: :bill_id,
    # class_name: "User"

#     SELECT Id, FirstName, LastName, Country
#   FROM Customer
#  WHERE Country IN 
#        (SELECT Country 
#           FROM Supplier) 


# Article.includes(:category, :comments)
class Api::CommentsController < ApplicationController
    before_action :require_login

    def create 
        @comment = Comment.new(comment_params)
        if @comment.save
            render "api/comments/show"
        else
            render json: @comment.errors.full_messages, status:422
        end
    end

    def index  
        @comments = Comment.all.where("lender_id = #{current_user.id.to_s} OR borrower_id = #{current_user.id.to_s}" )
        render "api/comments/index"
    end


    def destroy
        @bill = Bill.find(params[:id])

        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.payments != []
            render json: ["cant delete a bill with payments already made to it-- payments must be atomic"]
        else
            @bill.destroy!
            render json: ["Destroyed bill #{@bill.id} about #{@bill.description}"]
        end
    end

    private
    def comment_params 
        params.require(:comment).permit!
    end

end



 

    def show
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def update
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.update(bill_params)
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status: 422
        end
    end

    def destroy

    end
    



# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {description: 'wqerqdwder', lender_id: 1, borrower_id: 2,amount: 2, settled: false }}
#     })

# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {user_one_id: 1, user_two_id: 2}}
#     })