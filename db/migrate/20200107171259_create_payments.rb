class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.integer :payer_id, null: false
      t.integer :bill_id, null: false
      t.integer :amount, null: false

      t.timestamps
    end
    add_index :payments, :payer_id
    add_index :payments, :bill_id

  end
end
