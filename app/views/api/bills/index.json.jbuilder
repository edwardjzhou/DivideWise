json.array! (@bills) do |bill|
    json.extract! bill, :lender_id, :borrower_id, :amount, :settled
end
