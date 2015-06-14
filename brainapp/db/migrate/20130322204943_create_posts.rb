class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :name
      t.string :title
      t.string :techs
      t.string :sources
      t.text :content

      t.timestamps
    end
  end
end
