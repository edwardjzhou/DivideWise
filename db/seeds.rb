# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(username: 'demousername', email: 'demo@demo.com', password: 'demopassword')
User.create!(username: 'test', email: 'test', password: 'testtest')
User.create!(username: 'edward', email: 'edward@edward.com', password: 'password')
User.create!(username: 'yin', email: 'yin@yin.com', password: 'password')
User.create!(username: 'Oliver', email: 'Oliver@oliver.com', password: 'password')
User.create!(username: 'guanyao', email: 'guanyao@oliver.com', password: 'password')


Bill.destroy_all
Bill.create!(description: 'good mongkok', lender_id: 1, borrower_id: 2, amount: 1000, settled: true)
Bill.create!(description: 'beer', lender_id: 1, borrower_id: 2, amount: 800, settled: true)
Bill.create!(description: 'anthony bourdain special', lender_id: 3, borrower_id: 1, amount: 1234, settled: true)
Bill.create!(description: 'dimsum', lender_id: 4, borrower_id: 3, amount: 1500, settled: true)
Bill.create!(description: 'alacarte $7 duck box', lender_id: 4, borrower_id: 1, amount: 9900, settled: true)
Bill.create!(description: 'pepsi', lender_id: 3, borrower_id: 2, amount: 100, settled: true)
Bill.create!(description: 'seafoodplace that jackiechan went to', lender_id: 2, borrower_id: 3, amount: 2000, settled: true)

Friendship.destroy_all
Friendship.create!(user_one_id: 1, user_two_id: 3)
Friendship.create!(user_one_id: 1, user_two_id: 2)
Friendship.create!(user_one_id: 2, user_two_id: 3)
Friendship.create!(user_one_id: 3, user_two_id: 2)
Friendship.create!(user_one_id: 4, user_two_id: 5)
Friendship.create!(user_one_id: 5, user_two_id: 1)

Payment.destroy_all
Payment.create!(payer_id: 2, bill_id: 1, amount: 500)
Payment.create!(payer_id: 2, bill_id: 1, amount: 300)
Payment.create!(payer_id: 2, bill_id: 2, amount: 500)
Payment.create!(payer_id: 1, bill_id: 3, amount: 200)
Payment.create!(payer_id: 1, bill_id: 3, amount: 950)
Payment.create!(payer_id: 3, bill_id: 4, amount: 1500)
Payment.create!(payer_id: 1, bill_id: 5, amount: 9800)
Payment.create!(payer_id: 2, bill_id: 6, amount: 50)
Payment.create!(payer_id: 2, bill_id: 1, amount: 50)
Payment.create!(payer_id: 3, bill_id: 7, amount: 2000)





