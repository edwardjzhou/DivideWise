#ECMA 2015 aka es6 has made learning typescript pointless
# => is lexically scoped so i take it to mean its this is where its literally written in code
# document.body.innerHTML.replace to replace

#for animating that thing on splitwise its "height:0 overflow: hidden" for the hidden thing
# then: height: 41%;
# transition: height 0.5s;

#css
# :focus represents the state when the element is currently selected to receive input and
# :active represents the state when the element is currently being activated by the user.
#When clicked the button is in :focus:active state.
# transition: height 0.5s
# controlled inputs in react pretty much have to be stateful as heck or they cannot give feedback to user on value changes
#  <select value="B">
#     <option value="A">Apple</option>
#     <option value="B">Banana</option>
#     <option value="C">Cranberry</option>
#   </select>
#<select multiple={true} value={['B', 'C']}>.

#Animating a group of items on mounting 
        # <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        #   {items}
        # </ReactCSSTransitionGroup>

#const divStyle = {
#   margin: '40px',
#   border: '5px solid pink'
# };
# we could do <div style ={ divStyle} /> right
# then if we wanna add or change anything we can just merge it 
#object.assign is a one-level shallow copy where as lodash merge is recursive deep copy

#STYLED components huge for job searching. imo > css modules
# import styled from 'styled-components';

# const Div = styled.div`
#   margin: 40px;
#   border: 5px outset pink;
#   &:hover {
#    background-color: yellow;
#  }
# `;

# const Paragraph = styled.p`
#   font-size: 15px;
#   text-align: center;
# `;

# const OutsetBox = () => (
#   <Div>
#     <Paragraph>Get started with styled-components 💅</Paragraph>
#   </Div>
# );

#random big O notes
#mergesort
# T(n) = 2 T(n/2) + O(n)         [the O(n) is for Combine]
# T(1) = O(1) 

# Recurrence	Algorithm	Big-Oh Solution
# T(n) = T(n/2) + O(1)	Binary Search	O(log n)
# T(n) = T(n-1) + O(1)	Sequential Search	O(n)
# T(n) = 2 T(n/2) + O(1)	tree traversal	O(n)
# T(n) = T(n-1) + O(n)	Selection Sort (other n2 sorts)	O(n2)
# T(n) = 2 T(n/2) + O(n)	Mergesort (average case Quicksort)	O(n log n) worstcasequick     T(n) = T(n-1) + O(n) because partition  takes forever
#A poor parition is one where the first element in the segment being partitioned is the pivot/paritition element O(N) for partition


#react notes:https://zhenyong.github.io/react/docs/forms.html

#while waiting for fetch to finish in the thunk action creator we can stick a LOADING component in or just use react.suspense?

# composition of components is like composition of functions 
# ownership: a child is a pure function of its parent, its parent messes with the prop it feeds it and it jsut takes it completely owned
# child is render in parents render
#state is for me to mess with myself
#props is for me to take from my master. these could be a function of my masters state or prop too thats fine
#props never a function of state over time only initially in constructor or something like that
#getoffsetheihgt of the html tag is best
#display:none to hide a child that is stateful by hiding it 


#IRRELEVANT to my proj but useful: 
#defualt props is sort of like setting a beginning this.state in constructor
#NO MIXINS In class
# var mixinName = {
    #getDefaultProps: function() {
    # return {
    #   value: 'default value'
    # };
#}
#let objClone = { ...obj };

# given an array of bills... is it best to just do pure functional component.apply(null, array) ?
# const args = [0, 1, 2];
# myFunction.apply(null, args);

# in a createclass object {mixins: [mixinName]  ...}
# then this.getDefaultProps works because this is the mixinName object
# i still need to get "This" keyword figured out better than jsut thinking of it as the object of the caller 
# does this auto attach to inherited methods  YES

#irrelevant due to redux:
#var { checked, ...other } = props; other is used for deeper children, i use checked NOW 

#on design: need to thinka bout when a component will be used. when will it get info. is it bewtter to batch info to it or is it better for child who may come later in time to just in time it

#patterns:
# # function fancybox(props){
#   return (
#     <div>
#       props.children
#   )
# }

#'√ '

#i should haev plotted out the box models for all containers first before even doing any styling or worrying about parent relationships
# functional components can have lifecytcle methods i was ignorant of htis: 
# componentWillMount: function() {
#     this.intervals = [];
#   },

#need to think if a parent handles all the data or not -- for splitwise i need all the data frontloaded? that would make it easier
# but i only need payments when i click on the UI of bills-- do i frontload the data or do i do just-in-time? Arbitrary
# since this is just a get request that makes a db query that takes 50 ms i should just frontload 
# the only thing that grows as there is more users is getting all other users to be used for potential friends
# everything else doesnt grow with more users

#props.children is arbitrary code between fancybox opening tag and closing tag

#random notes: a modal is a lightbox for forms
#/* Add a pseudo-element inside the target element */
# p:target::before {
#   font: 70% sans-serif;
#   content: "►";
#   color: limegreen;
#   margin-right: .25em;
# }  and pictures for my dashboard link

#https://medium.com/@User3141592/single-vs-composite-indexes-in-relational-databases-58d0eb045cbe
# unique on a COLUMN means that once that once one value is matched from that column the query can stop
# unique on a composite index like [friend_user_one, friend_User_two] means that looking for a friend_user_one = 5 is sped up, or friend_1=2, friend2=3
# but friend_2 = 5 IS NOT SPED UP at all (but if friend_2 was indexed )

class User < ApplicationRecord
  
  attr_reader :password
  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, :email, presence: true, allow_blank: false
  validates :username, :email, uniqueness: { case_sensitive: false }
  validates :username, format: { with: /\A[a-zA-Z0-9@.]+\z/, message: "must only be letters and numbers" }  #cheat a little with a "@" and "." for google OAUTH
  validates :email, format: { with: /\A.+@.+\z/, message: "must be of x@x format where x are anything" } 
  validates :password, length: { minimum: 8 }, allow_nil: true
#SELECT COUNT(DISTINCT date) FROM records
#Record.count('date', :distinct => true)


  #Employee.includes(:forms)
  #  Employee.preload(:forms).map { |employee| employee.forms }.flatten


# User.includes(:lenders) =
  has_many :borrowings,
  foreign_key: :borrower_id,
  class_name: "Bill"

  has_many :lendings,
  foreign_key: :lender_id,
  class_name: "Bill"

  has_many :lenders,
  through: :borrowings,
  source: :lender 

  has_many :borrowers,
  through: :lendings,
  source: :borrower

#Client.where(orders_count: [1,3,5])
# SELECT * FROM clients WHERE (clients.orders_count IN (1,3,5))
  #Friend assocs: should've done two entries/friendship rather than one; it wouldve been much easier/faster
  has_many :friendships_one,  
  foreign_key: :user_one_id,
  class_name: 'Friendship'

  has_many :friendships_two,
  foreign_key: :user_two_id,
  class_name: 'Friendship'

  has_many :friends_one, 
  through: :friendships_one, 
  source: :user_one

  has_many :friends_two,
  through: :friendships_two,
  source: :user_two
  #end friends assocs

  has_many :payments,
  foreign_key: :payer_id,
  class_name: 'Payment'

# SELECT DISTINCT Country FROM Customers
      
# i need bills (rows) im involved in, with the payments nested in thems id
# i need bills that are me lending
# i need bills that are me borrowing
# i need all friends user ids
# i need all user ids
# i need all payments 

#  scope :published, -> { where(published: true) }
#   scope :featured, -> { where(featured: true) }

#   def self.latest_article
#     order('published_at desc').first
#   end

#   def self.titles
#     pluck(:title)
#   end

  # scope :dry_clean_only, -> { joins(:washing_instructions).where('washing_instructions.dry_clean_only = ?', true) }


  # can i call self on myself 
  # def asdf
  #   Bill.all.include(self)    
    
  #   results = ActiveRecord::Base.connection.execute(sql)
  #   results.values
  # end

  # def self.red
  #   where(id: 1)
  #   # where(color: :red).select('shirts.*').includes(:washing_instructions
  # end

  # def self.findBillIDs(user)

  # end
  # # Person.
  # # joins(:manager).
  # # where.
  # # not(managers_people: { id: Person.find_by!(name: "Eve") })

  # def self.test
  #   users = User.order(:updated_at).includes(:friends_one).limit(10)

  #   SELECT * 
  #   FROM users
  #   WHERE users.id IN (
  #     SELECT lender_id
  #     FROM bills 

  #   )
  #   LIMIT 10

  # end


  # EXAMPLE:
  # SCOPE CUTS DOWN ON THE ACTIVERECORD OBJECTS SIZE BY whereing it
  # other class methods are FOR accessory clauses like limit 1 or order 
  #Article.published.create.published # => true 

# https://api.rubyonrails.org/classes/ActiveRecord/Scoping/Named/ClassMethods.html
#   class Article < ActiveRecord::Base
#   scope :published, -> { where(published: true) }
#   scope :featured, -> { where(featured: true) }

#   def self.latest_article
#     order('published_at desc').first
#   end

#   def self.titles
#     pluck(:title)
#   end
# end

# User.find(1) return an instance of class User
# User.where(id: 1) returns an activerecord object


def friends
  Friendship.where("user_one_id = ? OR user_two_id = ?", self.id, self.id)
end

# SELECT COUNT(1)
# FROM table_name
# WHERE unique_key = value;

  def self.findFriendUserIDs(user)
    user.friendships_one.pluck('user_two_id') + user.friendships_two.pluck('user_one_id')
  end


  def self.find_by_credentials(username, password)
    # user = User.find_by(username: username)
    user = User.where("LOWER(username) = LOWER(?)", username).first
    if user and user.is_valid_password?(password)
      return user
    else
      return nil
    end
  end
  # order of operations
  # User.new  model setter methods are run and bad params like password are dropped out of the user object but re-attached as a attr reader
  # User.save  every validation is run and errors are set. password is checked for length i guess
  def password=(password) #all setter methods are auto run upon User.new(username: 'hi', email: 'hi@hi', password:'asdf') RAILS magic
    ##<User id: nil, username: "hi", email: "hi@hi", password_digest: "$2a$12$Hrj03heTed4BLhhqbefHqupbHRYYPS6ZOSMSIAdXtS1...", session_token: "DG25uoswxItn_REQFrKQjQ", created_at: nil, updated_at: nil>
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end


