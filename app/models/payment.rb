class Payment < ApplicationRecord
    belongs_to :payer,
    foreign_key: :'payer_id',
    class_name: 'User'

    belongs_to :bill,
    foreign_key: :bill_id,
    class_name: 'Bill'

end
