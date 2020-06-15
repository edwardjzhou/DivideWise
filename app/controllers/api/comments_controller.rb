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
        # p comment_params
        # p params
        #p params["bill_id"] #this is the route param if you do api/bills/***3***/comments/ params[:id] HERE AT END
        #p @current_user
                # p @comment

        @comment = Comment.new(comment_params) #just body => body
        
        @comment.bill_id = params[:bill_id]
        @comment.user_id = @current_user.id
        # p @comment
        # if @comment.user_id != @current_user.id
        #     render json: ["cannot create comments for others"], status:422
        if !Bill.BillIdsOfUser(@current_user).include? @comment.bill_id 
            render json: ["cannot create comments on bills you're not in"], status:422
        elsif @comment.save
            render json: @comment
        else
            render json: @comment.errors.full_messages, status:422
        end
    end
#     asdf=$.ajax({
#     method: 'POST',
#     url: 'api/bills/adsf/comments',
#     data: {comment: { bill_id:3, user_id: 3, body: "hey" }}
# }).then(res=>console.log(res),res=>console.log(res))
    # 1. route params are accessed by looking at params
    # 2. route param can be like random text not just #
    # 3. querystring at end of post like comments?asdf=5 is accessed by params[:asdf]
    # 4. $.ajax makes things simpler by auto JSONing your POJO AND doing headers:json 
    # fetch equiv is 
    # fetch('api/bills/3/comments',{method:`post`,
    # headers: {
    #             'Content-Type': 'application/json'
    #         },
    # body:
    #   JSON.stringify({comment: { bill_id:3, user_id: 4, body: "hey" }})
    #})

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
        
        # sql = <<-SQL
        # INSERT INTO link (url, name)
        # VALUES ('https://www.postgresqltutorial.com','PostgreSQL Tutorial');
        # answer = execute_statement(sql)
        # SQL


        # sql = <<-SQL
        # CREATE TABLE test_table_rails
        # SQL
        
        render json: execute_statement(sql)
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

    # def show
    #     @comment = Comment.find(params[:id])
    #     render json: @comment
    # end

    def update #this requires a api/comments/:id
        # p comment_params #Parameters: {"comment"=>{"bill_id"=>"1", "user_id"=>"1", "body"=>"hey"}, "id"=>"1"}
        @comment = Comment.find(params[:id])
        if @current_user.id != @comment.user_id
            render json: ["not a comment authored by you"], status:422
        elsif @comment.update(body: comment_params[:body])
            # render "api/comments/show"
            # sqlrow.update returns true if successful. @comment is updated by update and isnt the old version (confirmed)
            render json: @comment
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

#     asdf= $.ajax({
#     method: 'PATCH',
#     url: '/api/comments/8',
#     data: {comment: {bill_id: 1, user_id: 1, bill_id: 1, body: "heydsaf" }}
# })

    def destroy
        @comment = Comment.find(params[:id])
        if @current_user.id != @comment.user_id #both are gonna be numbers luckily
            render json: ["not a comment authored by you"], status: 422
        else
            @comment.destroy! #exclamation mark breaks this witha  404 request it hink so render joson saying success wont even happen
            render json: ["Destroyed comment #{@comment.id} saying #{@comment.body}"]
        end
    end
#     asdf= $.ajax({
#     method: 'DELETE',
#     url: '/api/comments/8',
#     data: {comment: {bill_id: 1, user_id: 1, bill_id: 1, body: "heydsaf" }}
# })

    private
    def comment_params 
        # params.require(:comment).permit!
        # params.require(:comment).permit(:user_id, :bill_id, :body) 
        params.require(:comment).permit(:body) 

        #Parameters: {"comment"=>{"FROMBODYOFAJAXbill_id"=>"1", "user_id"=>"1", "body"=>"hey"}, "FROMURLbill_id"=>"3"}

    end

end


# 1. params from the URL routes vs the params being in body
# 2. what happens if we oversend or udnersend data after require.permit
# 3. ./ vs / vs nothing in url: 
# 4. why does fetch need babysitting with JSON.stringify but ajax doesnt


# $.ajax({
#     method: 'POST',
#     url: '/api/bills/3/comments/1',
#     data: {comment: {bill_id: 1, user_id: 1, bill_id: 1, body: "hey" }}
# })
#   resources :comments, only: [:destroy, :update]
#     resources :bills do
#       resources :comments, only: [:create, :index]
#       resources :payments, only: [:create, :index]

#<Comment id: 1, user_id: 1, bill_id: 1, body: "I will pay you back next week", created_at: "2020-05-15 08:26:39", updated_at: "2020-05-15 08:26:39">,
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