# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

location1 = Location.create({name: "21st Amendment BrewPub", address: "123 A street, San Francisco, CA", zip_code: 94110})
location2 = Location.create({name: "Ziggy's Ale House", address: "3049 Ale Lane, Stout-Lager, ABV", zip_code: 23948})

beer1 = Beer.create(
	{name: "Monk's Blood", 
		abv: "9.5%", 
		rating: "*****", 
		price: "$8.75", 
	}
) 						

beer1.locations << location1
beer1.locations << location2



location3 = Location.create({name: "The Beer Hall", address: "9023 Haight St, San Francisco, CA", zip_code: 94111})
location4 = Location.create({name: "Chug'n'Go", address: "209 Porter Rd., Barrel Aged, OG", zip_code: 76555})

beer2 = Beer.create(
	{name: "Shallow Grave Porter", 
		abv: "6.5%", 
		rating: "****", 
		price: "$8.75", 
	}
) 				

beer2.locations << location3
beer2.locations << location4


location5 = Location.create({name: "The Alchemist", address: "74 Hop Avenue, San Francisco, CA", zip_code: 94110})
location6 = Location.create({name: "Hofbrau", address: "293 Barley Way, Pale Ale, IPA", zip_code: 94110})

beer3 = Beer.create(
	{name: "Full Boar Scotch Ale", 
		abv: "6.2%", 
		rating: "*****", 
		price: "$6.50", 
	}
) 				

beer3.locations << location5
beer3.locations << location6

