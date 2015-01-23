class CreateBeers < ActiveRecord::Migration
  def change
    create_table :beers do |t|
    	t.string :name
    	t.string :abv
    	t.string :rating
    	t.string :price
    end
  end
end
