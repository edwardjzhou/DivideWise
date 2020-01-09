class Api::BillsController < ApplicationController
    def create
        @bill = Bill.new(bill_params)
        if @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:423
        end
    end

    def user_params
        params.require(:bill).permit(:username, :email, :password, :name, :password, :password_digest, :id)
    end
end
