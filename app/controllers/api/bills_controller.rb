class Api::BillsController < ApplicationController
    before_action :require_login

    def create
        @bill = Bill.new(bill_params)
       if !Friendship.where("user_one_id = ? OR user_two_id = ?", @bill.lender_id.to_s, @bill.lender_id.to_s)
            .where("user_one_id = ? OR user_two_id = ?", @bill.borrower_id.to_s, @bill.borrower_id.to_s)
            p 'asdf'
            render json: ["become friends first before creating a bill with others"]
        elsif current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            p 'fml'
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            p 'asdfasdf'
            render "api/bills/show"
        else
            p 'asdfsadlkjfsdkfsadjfk'
            render json: @bill.errors.full_messages, status:422
        end
    end

    def index  
        @bills = Bill.all.where("lender_id = #{current_user.id.to_s} OR borrower_id = #{current_user.id.to_s}" )
        render "api/bills/index"
        #[{"id":1,"description":"good mongkok",
        # "lender_id":1,"borrower_id":2,"amount":1000,
        # "settled":true,"created_at":"2020-01-10T21:39:15.985Z",
        # "updated_at":"2020-01-10T21:39:15.985Z"},
        # {"id":2,"description":"beer","lender_id":1,"borrower_id":2,
        # "amount":800,"settled":true,"created_at":"2020-01-10T21:39:15.990Z",
        # "updated_at":"2020-01-10T21:39:15.990Z"}]
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
    def bill_params
        # params.require(:bill).permit(:description, :lender_id, :borrower_id, :amount, :settled)
        params.require(:bill).permit!
    end
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