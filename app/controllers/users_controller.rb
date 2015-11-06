class UsersController < ApplicationController
  def index
  end

  def create
    @user = User.find(params[:user_id])
    match_id = params[:match_id].to_i
    @match = @user.matches.new(match_id)
    if @match.save
      redirect_to 
  end
end
