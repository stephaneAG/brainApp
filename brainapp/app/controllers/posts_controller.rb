class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(params[:post])

    respond_to do |format|
      if @post.save
        
        #format.html { redirect_to @post, notice: 'Post was successfully created.' }
        # Tef Edit on 07/04/2013 to redirect directly to the 'root' page right after the form submission on a post creation
        # (> cause I often add notes by 10s' ;D )
        #format.html { redirect_to :root, notice: 'Redirection to root was successfully done.' } # digg why sometimes error in home/index.html.erb
        format.html { redirect_to :root } # simple redirection without notice ( > for the moment )
        format.json { render json: @post, status: :created, location: @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        #format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        # Tef Edit on 07/04/2013 to redirect directly to the 'root' page right after the form submission on a post creation
        # (> cause I often add notes by 10s' ;D )
        #format.html { redirect_to :root, notice: 'Redirection to root was successfully done.' } # digg why sometimes error in home/index.html.erb
        format.html { redirect_to :root } # simple redirection without notice ( > for the moment )
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      #format.html { redirect_to posts_url }
      # Tef Edit on 07/04/2013 to redirect directly to the 'root' page right after the form submission on a post creation
      # (> cause I often add notes by 10s' ;D )
      #format.html { redirect_to :root, notice: 'Redirection to root was successfully done.' } # digg why sometimes error in home/index.html.erb
      format.html { redirect_to :root } # simple redirection without notice ( > for the moment )
      format.json { head :no_content }
    end
  end
end
