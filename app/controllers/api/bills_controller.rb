class Api::BillsController < ApplicationController
    def create
        @bill = Bill.new(bill_params)
        @bill.settled = true

        if @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def index
        index = Bill.all.where("settled = 'true'").where("lender_id = '1'")
        render json: [index]
    end

    def show
    end

    def update
    end

    def destroy
    end


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