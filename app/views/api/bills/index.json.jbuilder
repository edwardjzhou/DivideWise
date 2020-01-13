json.array! (@bills) do |bill|
    json.set! bill.id do
        json.extract! bill, :lender_id,:borrower_id, :amount, :settled, :created_at
        json.lender bill.lender.username
        json.borrower bill.borrower.username
    end
end


