# message passing and messages: key to concurrency and OOP and used in objective C
#channel is a model for interprocess comms and synchronization by using messages; GOlang
#function machines: classical inheritance dressing down by gang of four => rise of compositional functions, IS A TYPE OF vs HAS
#reactionary: javascript too spaghetti => over functionalized react/redux with pureness of compositonal functions and function machines with 1 director of truth

#at its core promises deal with futurity. futurity auto brings uncertainty so have to give 2 cbs 
# but is the thing running inside the promise on the event loop though or the callstack? no guide explicitly explains properly  or is only running the success/fail cb on the event loop
#assume: NOt a lot of people actually fully understand this concept
# if main() is the one who called the promise.then.then or Promise.all or whatever then IFF when main() is at the top of the callstack can that promise run a callback? or can main not close out

# css with mixins and variables = sass
# but still too difficult to manage to styled components inside the actual component file is best? how is it reusable though -- its literally inline with a littel better functional closure global modularity
# styled.div`` dont get it

# providers/ consumers of API request/response; a consumer would be my frontend and a provider would be my rails
# event emitters/listeners like js eventlisteners or even websockets? 

#javascript never can get pointers/addresses for securitys sake? all pass by value except arrays nad objects
#objects can have properties set with getter/setter or undeletable with defineproperty

# obj = {} inside = {} best way to mess with the insides of a nested object is to just define the reference as const current to ensure you have it by reference

#best way to build up a table
# left joins left joins left joins ?
# or union join 

# INSERT INTO Customers (CustomerName, City, Country)
# VALUES ('Cardinal', 'Stavanger', 'Norway');

#SELECT *
# FROM CUSTOMERS
# WHERE (CustomerName, City, Country) = ('Cardinal', 'Stavanger', 'Norway');
# coalessce first non null value in a list
# https://www.w3schools.com/sql/trymysql.asp?
#is cross join the same as just listing 2 talbes in From? 
# can from handle just taking 1 column 

# react testing states and props vanilla react
# test giving a child a function as a prop that changes parents prop to it


# params = ActionController::Parameters.new({
# irb(main):005:2*   person: {
# irb(main):006:3*     name: "Francesco",
# irb(main):007:3*     age:  22,
# irb(main):008:3*     role: "admin"
# irb(main):009:3>   }
# irb(main):010:2> })
# note: GRAVES SYMBOLS DONT WORK IN RUBY FOR HASHES AT LEAST
# params[`person`][]

#example: does a record exisT?
# IF [NOT] EXISTS ( SELECT 1 FROM MyTable WHERE ... )

# IF NOT EXISTS ( SELECT 1 FROM Users WHERE FirstName = 'John' AND LastName = 'Smith' )
# BEGIN
#     INSERT INTO Users (FirstName, LastName) VALUES ('John', 'Smith')
# END

# SELECT 1 FROM MyTable WHERE <MyCondition>

# -- Method 1.
# SELECT 1
# FROM table_name
# WHERE unique_key = value;

# -- Method 2.
# SELECT COUNT(1)
# FROM table_name
# WHERE unique_key = value;

#noobie insights: everything is a table
# SELECT *
# FROM (
#   VALUES(1),(2),(3)
# ) t(a)

# order of operations in sql
# from -> join -> wehre -> group by -> having -> select -> order by 

#example : Active record it loads all the messages for the channels that match the id
# @messages = Channel.includes(:messages).find(params[:id]).messages
#eagerly

# SELECT
#    *       
# FROM
#    tracker       
# WHERE
#    reservation_id IN (
#       SELECT
#          reservation_id                                 
#       FROM
#          tracker                                 
#       GROUP  BY
#          reservation_id                                 
#       HAVING
#          (
#             method = 1                                          
#             AND type = 0                                          
#             AND Count(*) > 1 
#          )                                         
#          OR (
#             method = 1                                              
#             AND type = 1                                              
#             AND Count(*) > 1 
#          )             

#exmaple: correlated subquery (That seems to me like sorta of a self join almost that runs like N^2 rather than 2N like most of my subquerys im familair with )
# where exists is better than IN for large subqueries and for subqueries that could return a NULL 
# SELECT employee_id, manager_id, first_name, last_name
# FROM employees a
# WHERE EXISTS
# (SELECT employee_id
# FROM employees b
# WHERE b.manager_id = a.employee_id)

#example: ordering by closest weight and height 

# select top 1 *
# from tbl
# order by ABS(weight-@weight) + ABS(height-@height)


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

    #get (ALL COMMENTS) from (ALL BILLS where currentuser is bill.lender_id or bill_borrower_id)
    #im nested under a bill/bill_id. To get a comment it has to be created by me or be a bill im in 

    def index
        sql = <<-SQL
        SELECT * 
        FROM comments 
        WHERE comments.bill_id 
        IN (SELECT bills.id 
            FROM bills 
            WHERE bills.lender_id = #{@current_user.id} OR bills.borrower_id = #{@current_user.id}
            ) AND  #{params[:bill_id]} = comments.bill_id 
        SQL
        answer = execute_statement(sql)
            
        render json: answer
    end

    # def index  
    #     #THIS GETS ALL COMMENTS INVOLVING BILLS CURRENT_USER IS ON
    #     # ActiveRecord::Base.connection.execute(sql)
    #     sql = <<-SQL
    #     SELECT * 
    #     FROM comments 
    #     WHERE comments.bill_id 
    #     IN (SELECT bills.id 
    #         FROM bills 
    #         WHERE bills.lender_id = #{@current_user.id} OR bills.borrower_id = #{@current_user.id}
    #         )
    #     SQL
    #     answer = execute_statement(sql)
            
    #     render json: answer
    #     # render json: [@current_user, answer, answer.values]

    #     #function (bill_id)
    #     # do i have access to this bill? (currentuser = lender_id or borrower_id)
    #     # then get all comments with bill_id = this bill_id
    #     # render json: Bill.involved(@current_user)
    #     # render "api/comments/index"
    # end

    def show
        @comment = Comment.find(params[:id])
        render json: @comment
    end

    def update
        @comment = Comment.find(params[:id])
        if current_user.id.to_s != @comment.user_id.to_s
            render json: ["not a comment you're involved in"]
        elsif @comment.update(bill_params)
            render "api/comments/show"
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])

        if current_user.id.to_s != @comment.user_id.to_s
            render json: ["not a comment authored by you"]
        else
            @comment.destroy!
            render json: ["Destroyed comment #{@comment.id} about #{@comment.body}"]
        end
    end

    private
    def comment_params 
        params.require(:comment).permit!
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