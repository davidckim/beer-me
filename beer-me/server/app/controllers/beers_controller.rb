class BeersController < ApplicationController
	def index 
		@beers = Beer.all
		render json: @beers
	end

	def show
		@locations = Location.where(zip_code: params[:id])
		@beers_array = []
		@locations.each do |bar|
			@beers_array << bar.beers
		end
		
		@beers_array.flatten!
		@beers = []
		@beers_array.each do |beer|
			@beers << {
				name: beer.name,
				abv: beer.abv,
				rank: beer.locations.count,
				price: beer.price,
				locations: beer.locations
			}
		end

		@beers.each do |beer|
				@locs = []
				@locs << beer[:locations]
				@locs.flatten!
				@locs.keep_if{|loc| @locations.include? loc}
				beer[:locations] = @locs
		end

		@beers.sort_by{|beer| beer["rank"]}

		render json: @beers
	end

end
