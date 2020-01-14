#json.array! (@bills) do |bill|
@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :email
        # json.lender bill.lender.username
        # json.borrower bill.borrower.username
        # # json.payments bill.payments
    end
end

