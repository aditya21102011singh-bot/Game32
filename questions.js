/* =========================================================================
   QUESTION DATABASE — CBSE Class 10 Geography, Ch. Agriculture
   Types: mcq | tf | fill | match | crop
   Difficulty: easy | medium | hard
   ========================================================================= */

const MCQ_BANK = [
  // ---- Types of Farming ----
  {id:"m001",d:"easy",cat:"Farming Types",q:"Which type of farming is practised with primitive tools like hoe and dao?",opts:["Primitive Subsistence Farming","Commercial Farming","Plantation Farming","Intensive Subsistence Farming"],a:0,exp:"Primitive subsistence farming uses simple tools and family/community labour, dependent on monsoon."},
  {id:"m002",d:"easy",cat:"Farming Types",q:"'Slash and burn' agriculture is also known as:",opts:["Jhumming","Terracing","Contour ploughing","Crop rotation"],a:0,exp:"Slash and burn agriculture is called Jhumming in North-East India."},
  {id:"m003",d:"medium",cat:"Farming Types",q:"In which state is Jhumming known as 'Pamlou'?",opts:["Manipur","Kerala","Punjab","Rajasthan"],a:0,exp:"Jhumming is called Pamlou in Manipur."},
  {id:"m004",d:"medium",cat:"Farming Types",q:"Intensive subsistence farming is practised in areas with:",opts:["High population pressure on land","Very low population density","Mechanised large farms","Only dry regions"],a:0,exp:"High pressure of population on land makes intensive use of land necessary, using biochemical inputs and irrigation."},
  {id:"m005",d:"medium",cat:"Farming Types",q:"Which farming uses HYV seeds, chemical fertilisers, insecticides and pesticides on a large scale?",opts:["Commercial Farming","Primitive Subsistence Farming","Jhumming","Shifting cultivation"],a:0,exp:"Commercial farming has a higher degree of mechanisation and inputs like HYV seeds and fertilisers."},
  {id:"m006",d:"hard",cat:"Farming Types",q:"Plantation agriculture is a type of:",opts:["Commercial farming","Subsistence farming","Shifting cultivation","Jhumming"],a:0,exp:"Plantation is a single crop grown on a large area for commercial purposes — a form of commercial farming."},
  {id:"m007",d:"easy",cat:"Farming Types",q:"Which of these is an example of a plantation crop?",opts:["Tea","Wheat","Gram","Maize"],a:0,exp:"Tea, coffee, rubber, banana and sugarcane are common plantation crops."},
  {id:"m008",d:"hard",cat:"Farming Types",q:"Plantation farming requires an interface of which two sectors?",opts:["Agriculture and Industry","Agriculture and Mining","Industry and Trade","Trade and Transport"],a:0,exp:"Plantation crops need capital-intensive inputs and processing, linking agriculture with industry."},

  // ---- Cropping Seasons ----
  {id:"m009",d:"easy",cat:"Cropping Seasons",q:"India has three cropping seasons: Rabi, Kharif and:",opts:["Zaid","Monsoon","Winter","Autumn"],a:0,exp:"The three cropping seasons of India are Rabi, Kharif and Zaid."},
  {id:"m010",d:"easy",cat:"Cropping Seasons",q:"Rabi crops are sown in:",opts:["Winter","Summer","Monsoon","Autumn"],a:0,exp:"Rabi crops are sown in winter (October-December) and harvested in summer (April-June)."},
  {id:"m011",d:"easy",cat:"Cropping Seasons",q:"Which of these is a Rabi crop?",opts:["Wheat","Rice","Jowar","Cotton"],a:0,exp:"Wheat, gram, and mustard are important Rabi crops."},
  {id:"m012",d:"easy",cat:"Cropping Seasons",q:"Kharif crops are grown with the onset of:",opts:["Monsoon","Winter","Spring","Summer"],a:0,exp:"Kharif crops are sown with the onset of monsoon and harvested in September-October."},
  {id:"m013",d:"easy",cat:"Cropping Seasons",q:"Which of these is a Kharif crop?",opts:["Rice","Wheat","Mustard","Gram"],a:0,exp:"Rice, maize, cotton, and jute are Kharif crops."},
  {id:"m014",d:"medium",cat:"Cropping Seasons",q:"The short season between the Rabi and Kharif seasons is called:",opts:["Zaid","Monsoon","Retreating season","Pre-monsoon"],a:0,exp:"Zaid is a short season for growing crops like watermelon, cucumber, and fodder crops."},
  {id:"m015",d:"medium",cat:"Cropping Seasons",q:"Which states are major producers of Rabi pulses?",opts:["Punjab and Haryana","Assam and Meghalaya","Kerala and Tamil Nadu","West Bengal and Odisha"],a:0,exp:"Punjab and Haryana are leading Rabi crop producers due to the Green Revolution."},

  // ---- Rice ----
  {id:"m016",d:"easy",cat:"Rice",q:"Rice is a crop of which season?",opts:["Kharif","Rabi","Zaid","All seasons"],a:0,exp:"Rice is predominantly a Kharif crop."},
  {id:"m017",d:"easy",cat:"Rice",q:"Rice requires a temperature of more than:",opts:["25°C","10°C","5°C","40°C"],a:0,exp:"Rice needs high temperature (above 25°C) and high humidity."},
  {id:"m018",d:"medium",cat:"Rice",q:"How much annual rainfall does rice require?",opts:["Above 100 cm","Below 50 cm","20-40 cm","Less than 10 cm"],a:0,exp:"Rice needs more than 100 cm rainfall; areas with less rainfall use irrigation."},
  {id:"m019",d:"medium",cat:"Rice",q:"Which technique enabled rice cultivation in low rainfall areas of Punjab and Haryana?",opts:["Irrigation","Terracing","Jhumming","Contour ploughing"],a:0,exp:"Irrigation supports rice cultivation in low-rainfall states like Punjab, Haryana and western UP."},
  {id:"m020",d:"hard",cat:"Rice",q:"India is the world's __ largest producer of rice, after China.",opts:["second","third","fourth","first"],a:0,exp:"India is the second-largest producer of rice in the world."},

  // ---- Wheat ----
  {id:"m021",d:"easy",cat:"Wheat",q:"Wheat is the second most important cereal crop after:",opts:["Rice","Maize","Barley","Millets"],a:0,exp:"Wheat is the main food crop in north and north-western India, second to rice."},
  {id:"m022",d:"medium",cat:"Wheat",q:"Wheat requires which climatic conditions?",opts:["Cool growing season, bright sunshine at ripening","Hot and humid throughout","Frost-free, high rainfall only","Cold throughout the year"],a:0,exp:"Wheat needs a cool growing season and bright sunshine at the time of ripening."},
  {id:"m023",d:"medium",cat:"Wheat",q:"The two main wheat-growing belts of India are the Ganga-Sutlej plains and:",opts:["Deccan Plateau (black soil region)","Coastal Andhra Pradesh","North-East Hills","Western Ghats"],a:0,exp:"The Ganga-Sutlej plains in the north-west and the black soil region of the Deccan are wheat belts."},
  {id:"m024",d:"hard",cat:"Wheat",q:"Which state is the largest producer of wheat in India?",opts:["Uttar Pradesh","Punjab","Bihar","Haryana"],a:0,exp:"Uttar Pradesh is the leading wheat-producing state, followed by Punjab and Haryana."},

  // ---- Millets ----
  {id:"m025",d:"easy",cat:"Millets",q:"Which of these is called a 'coarse grain'?",opts:["Jowar","Rice","Wheat","Gram"],a:0,exp:"Jowar, bajra and ragi are coarse grains with high nutritional value."},
  {id:"m026",d:"medium",cat:"Millets",q:"Jowar is grown in:",opts:["Rain-fed areas","Only irrigated deltas","Hilly terraces exclusively","Coastal wetlands only"],a:0,exp:"Jowar is a rain-fed crop mostly grown in Maharashtra, Karnataka, Andhra Pradesh, MP."},
  {id:"m027",d:"medium",cat:"Millets",q:"Bajra grows well on:",opts:["Sandy soils and shallow black soil","Deep clayey soils only","Waterlogged fields","Peaty soils"],a:0,exp:"Bajra grows well on sandy soils and shallow black soils."},
  {id:"m028",d:"medium",cat:"Millets",q:"Which state is a leading producer of ragi?",opts:["Karnataka","Punjab","Haryana","Kerala"],a:0,exp:"Karnataka is a major ragi-producing state, grown on red, black, sandy, loamy soils."},

  // ---- Maize ----
  {id:"m029",d:"easy",cat:"Maize",q:"Maize is used both as food and:",opts:["Fodder","Fibre","Fuel wood","Rubber"],a:0,exp:"Maize is a food as well as fodder crop, grown under Kharif season."},
  {id:"m030",d:"medium",cat:"Maize",q:"Maize requires temperature between:",opts:["21°C to 27°C","0°C to 5°C","35°C to 45°C","5°C to 10°C"],a:0,exp:"Maize grows in temperatures between 21°C and 27°C on old alluvial soil."},

  // ---- Pulses ----
  {id:"m031",d:"easy",cat:"Pulses",q:"India is the world's largest producer as well as consumer of:",opts:["Pulses","Rice","Wheat","Cotton"],a:0,exp:"India leads the world in pulses production and consumption."},
  {id:"m032",d:"medium",cat:"Pulses",q:"Pulses being leguminous crops help restore soil fertility by fixing:",opts:["Nitrogen","Phosphorus","Potassium","Carbon"],a:0,exp:"Pulses fix nitrogen from the atmosphere, which improves soil fertility."},
  {id:"m033",d:"medium",cat:"Pulses",q:"Major pulse producing states include Madhya Pradesh, Uttar Pradesh, and:",opts:["Rajasthan","Kerala","Assam","Goa"],a:0,exp:"MP, UP, Rajasthan, Maharashtra and Karnataka are leading pulse producers."},

  // ---- Cash Crops / Sugarcane ----
  {id:"m034",d:"easy",cat:"Sugarcane",q:"Sugarcane is a crop of:",opts:["Tropical and sub-tropical areas","Cold temperate zones only","Desert regions","Hilly terraces only"],a:0,exp:"Sugarcane grows well in tropical and sub-tropical climates."},
  {id:"m035",d:"medium",cat:"Sugarcane",q:"Sugarcane provides raw material for which industries?",opts:["Sugar and Gur (jaggery) industries","Textile industries","Cement industries","Paper industries only"],a:0,exp:"Sugarcane is the basic raw material for sugar, gur and khandsari."},
  {id:"m036",d:"medium",cat:"Sugarcane",q:"India is the world's __ largest producer of sugarcane after Brazil.",opts:["second","third","first","fourth"],a:0,exp:"India ranks second in sugarcane production after Brazil."},

  // ---- Oilseeds ----
  {id:"m037",d:"easy",cat:"Oilseeds",q:"India is the largest producer of oilseeds in the world, occupying about __ of total cropped area.",opts:["12%","50%","5%","30%"],a:0,exp:"Oilseeds occupy about 12% of the total cropped area of India."},
  {id:"m038",d:"medium",cat:"Oilseeds",q:"Which of these is NOT a major oilseed produced in India?",opts:["Rice","Groundnut","Mustard","Sesamum"],a:0,exp:"Groundnut, mustard, coconut, sesamum, castor seeds, cotton seeds, linseed and sunflower are major oilseeds; rice is a cereal."},
  {id:"m039",d:"medium",cat:"Oilseeds",q:"Groundnut is grown mainly in:",opts:["Kharif season","Rabi season","Zaid season only","Winter only"],a:0,exp:"Groundnut is a Kharif crop and India is its largest producer, sharing 1/3rd of the world's area."},
  {id:"m040",d:"hard",cat:"Oilseeds",q:"Mustard is largely a crop of:",opts:["Rabi season","Kharif season","Zaid season","Monsoon season"],a:0,exp:"Mustard is grown in the Rabi season in India."},

  // ---- Tea ----
  {id:"m041",d:"easy",cat:"Tea",q:"Tea cultivation is an example of:",opts:["Plantation agriculture","Subsistence farming","Shifting cultivation","Jhumming"],a:0,exp:"Tea is grown on plantations requiring capital, labour and managerial skill."},
  {id:"m042",d:"medium",cat:"Tea",q:"Tea requires soil rich in:",opts:["Humus and organic matter","Salt content","Sand only","Limestone"],a:0,exp:"Tea grows well in deep and fertile well-drained soil, rich in humus and organic matter."},
  {id:"m043",d:"medium",cat:"Tea",q:"Which state is the largest producer of tea in India?",opts:["Assam","Kerala","Karnataka","Himachal Pradesh"],a:0,exp:"Assam, along with hills of Darjeeling and Jalpaiguri in West Bengal, is a leading tea region."},
  {id:"m044",d:"hard",cat:"Tea",q:"Tea plantations need labour that is:",opts:["Skilled and cheap in abundance","Unskilled and scarce","Only seasonal, no training needed","Fully mechanised, no labour"],a:0,exp:"Tea is a labour-intensive industry requiring an abundant supply of cheap, skilled labour."},

  // ---- Coffee ----
  {id:"m045",d:"easy",cat:"Coffee",q:"Indian coffee is known in the international market for:",opts:["Good quality","Poor quality","Being genetically modified","Being cheapest"],a:0,exp:"Indian coffee, the Arabica variety, is known globally for good quality."},
  {id:"m046",d:"medium",cat:"Coffee",q:"Coffee cultivation in India is mainly confined to the:",opts:["Nilgiri hills of Karnataka, Kerala and Tamil Nadu","Himalayan foothills","Gangetic plains","Thar desert"],a:0,exp:"Coffee is grown in the Nilgiri hills of Karnataka, Kerala and Tamil Nadu."},

  // ---- Rubber ----
  {id:"m047",d:"easy",cat:"Rubber",q:"Rubber is an important:",opts:["Industrial raw material","Food crop","Cereal crop","Pulse"],a:0,exp:"Rubber is an equatorial crop used as an important raw material for industry."},
  {id:"m048",d:"medium",cat:"Rubber",q:"Rubber requires moist and humid climate with rainfall of more than:",opts:["200 cm","20 cm","500 cm","50 cm"],a:0,exp:"Rubber requires more than 200 cm of rainfall and temperature above 25°C."},
  {id:"m049",d:"medium",cat:"Rubber",q:"Rubber is mainly grown in:",opts:["Kerala, Tamil Nadu, Andaman & Nicobar Islands","Punjab and Haryana","Rajasthan and Gujarat","Jammu and Kashmir"],a:0,exp:"Kerala, Tamil Nadu and the Andaman & Nicobar and Garo hills produce rubber."},

  // ---- Cotton ----
  {id:"m050",d:"easy",cat:"Cotton",q:"India is believed to be the original home of:",opts:["Cotton","Wheat","Tea","Coffee"],a:0,exp:"India is considered the original home of the cotton plant."},
  {id:"m051",d:"medium",cat:"Cotton",q:"Cotton grows well in:",opts:["Black soil of the Deccan Plateau","Peaty soil","Laterite soil only","Desert sand only"],a:0,exp:"Cotton requires black soil, high temperature, light rainfall or irrigation, 210 frost-free days."},
  {id:"m052",d:"medium",cat:"Cotton",q:"Cotton is the basic raw material for the __ industry.",opts:["Cotton textile","Sugar","Paper","Cement"],a:0,exp:"Cotton is the raw material for the cotton textile industry."},
  {id:"m053",d:"hard",cat:"Cotton",q:"Cotton requires how many frost-free days?",opts:["210","100","365","30"],a:0,exp:"Cotton needs about 210 frost-free days and bright sunshine for its growth."},

  // ---- Jute ----
  {id:"m054",d:"easy",cat:"Jute",q:"Jute is known as the:",opts:["Golden Fibre","Silver Fibre","Black Gold","White Gold"],a:0,exp:"Jute is popularly known as the Golden Fibre."},
  {id:"m055",d:"medium",cat:"Jute",q:"Jute grows well on:",opts:["Well-drained fertile soils in flood plains","Dry desert soils","Rocky mountain terrain","Saline coastal soil"],a:0,exp:"Jute grows on well-drained fertile soil in flood plains where soil is renewed every year."},
  {id:"m056",d:"medium",cat:"Jute",q:"Which state is the largest producer of jute?",opts:["West Bengal","Punjab","Gujarat","Rajasthan"],a:0,exp:"West Bengal, Bihar and Assam are the leading jute-producing states."},

  // ---- Horticulture ----
  {id:"m057",d:"easy",cat:"Horticulture",q:"India is a producer of which fruits and vegetables in large quantity?",opts:["Both fruits and vegetables","Only cereals","Only pulses","Only oilseeds"],a:0,exp:"India produces a variety of fruits and vegetables and ranks very high in the world."},
  {id:"m058",d:"medium",cat:"Horticulture",q:"India is the largest producer of which fruit in the world?",opts:["Mangoes","Apples","Grapes","Oranges"],a:0,exp:"India is the world's largest producer of mangoes."},

  // ---- Green Revolution & Technological Reforms ----
  {id:"m059",d:"easy",cat:"Green Revolution",q:"The Green Revolution in India began in the:",opts:["1960s","1980s","1990s","1940s"],a:0,exp:"The Green Revolution, based on HYV seeds, began in the mid-1960s."},
  {id:"m060",d:"medium",cat:"Green Revolution",q:"The Green Revolution relied heavily on:",opts:["High Yielding Variety (HYV) seeds","Organic manure only","Traditional seeds","Shifting cultivation"],a:0,exp:"HYV seeds, along with fertilisers and irrigation, drove the Green Revolution."},
  {id:"m061",d:"medium",cat:"Green Revolution",q:"'White Revolution' refers to a program to increase the production of:",opts:["Milk","Rice","Cotton","Sugar"],a:0,exp:"White Revolution (Operation Flood) boosted milk production."},
  {id:"m062",d:"medium",cat:"Institutional Reforms",q:"Which scheme provides loans to farmers to purchase agricultural inputs?",opts:["Kisan Credit Card (KCC)","National Food Security Mission","PM-Kisan Yojana only","MGNREGA"],a:0,exp:"Kisan Credit Card (KCC) and Personal Accident Insurance Scheme (PAIS) support farmers with credit."},
  {id:"m063",d:"hard",cat:"Institutional Reforms",q:"Land reforms after independence mainly aimed at:",opts:["Abolishing the Zamindari system","Introducing plantation farming","Encouraging Jhumming","Promoting cash crops only"],a:0,exp:"The first major reform after independence was the abolition of the Zamindari system."},
  {id:"m064",d:"medium",cat:"Institutional Reforms",q:"The government announces __ before the sowing season to protect farmers from unwarranted price fluctuations.",opts:["Minimum Support Price (MSP)","Retail Price Index","Wholesale Price only","Consumer Price Index"],a:0,exp:"Minimum Support Price (MSP), remunerative and procurement prices are announced for crops."},
  {id:"m065",d:"medium",cat:"Institutional Reforms",q:"Which system offers real-time information and services to farmers via internet/mobile?",opts:["e-technology / Kisan Call Centres","Zamindari system","Jhumming","Contour ploughing"],a:0,exp:"e-technology through Kisan Call Centres and portals helps farmers with real-time advice."},

  // ---- Food Security & Contribution to Economy ----
  {id:"m066",d:"easy",cat:"Food Security",q:"India has become self-sufficient in food grains due to:",opts:["Green Revolution","Only rainfall","Foreign imports","Jhumming"],a:0,exp:"The Green Revolution helped India achieve self-sufficiency in food grain production."},
  {id:"m067",d:"medium",cat:"Economy",q:"Agriculture provides employment to nearly __ of the population of India (traditionally, per NCERT).",opts:["Two-thirds","One-tenth","One-fourth","Nine-tenths"],a:0,exp:"NCERT text notes that about two-thirds of India's population is still dependent on agriculture."},
  {id:"m068",d:"medium",cat:"Economy",q:"Agriculture is a source of raw material for which sector?",opts:["Agro-based industries","Mining sector only","IT sector","Banking sector"],a:0,exp:"Agriculture supplies raw material to agro-based industries such as sugar, textile, and food processing."},

  // ---- Globalization & Miscellaneous ----
  {id:"m069",d:"medium",cat:"Globalization",q:"WTO stands for:",opts:["World Trade Organisation","World Textile Organisation","World Trust Organisation","World Tariff Office"],a:0,exp:"WTO (World Trade Organisation) agreements affect Indian farmers by opening trade to global competition."},
  {id:"m070",d:"hard",cat:"Globalization",q:"Since 1990s, under the WTO, Indian farmers have shifted focus towards:",opts:["Crops which have a huge export potential","Only subsistence crops","Only traditional millets","Only forest products"],a:0,exp:"After globalization, farmers began producing crops with export potential like cotton, fruits."},
  {id:"m071",d:"medium",cat:"Organic Farming",q:"Farming without the use of chemical fertilisers and pesticides is called:",opts:["Organic farming","Commercial farming","Plantation farming","Intensive farming"],a:0,exp:"Organic farming uses manures and biopesticides instead of chemical inputs."},
  {id:"m072",d:"medium",cat:"Organic Farming",q:"A major benefit of organic farming is:",opts:["It is eco-friendly and cheaper","It always gives higher yield than HYV","It requires more chemicals","It needs no labour"],a:0,exp:"Organic farming is cost effective and environment friendly, though yields can be lower initially."},

  // ---- Extra applied/analytical ----
  {id:"m073",d:"hard",cat:"Farming Types",q:"Which farming type is characterised by 'right of inheritance' leading to sub-division of land?",opts:["Intensive Subsistence Farming","Plantation Farming","Commercial Farming","Jhumming"],a:0,exp:"In intensive subsistence farming, land holdings are small due to the right of inheritance."},
  {id:"m074",d:"hard",cat:"Rice",q:"Besides irrigation, which region uses the Rabi season to also grow rice through irrigation facilities?",opts:["West Bengal, Odisha, Andhra Pradesh, Tamil Nadu","Punjab and Haryana only","Rajasthan desert","Ladakh"],a:0,exp:"With the help of irrigation, rice is also grown in the Rabi season in West Bengal, Odisha, AP and TN."},
  {id:"m075",d:"medium",cat:"Wheat",q:"Wheat is basically a crop of the:",opts:["Temperate zone","Equatorial zone","Tropical rainforest","Polar zone"],a:0,exp:"Wheat is grown in temperate zones, needing a cool growing season."},
  {id:"m076",d:"medium",cat:"Millets",q:"Which of these crops is known as a 'dual crop' since it is used as food and fodder both?",opts:["Jowar","Tea","Rubber","Jute"],a:0,exp:"Jowar is a rain-fed crop grown for food and fodder both."},
  {id:"m077",d:"hard",cat:"Sugarcane",q:"Sugarcane requires rainfall between:",opts:["75 cm to 100 cm","10 cm to 20 cm","300 cm to 400 cm","0 cm to 5 cm"],a:0,exp:"Sugarcane needs a hot and humid climate with rainfall between 75 cm and 100 cm."},
  {id:"m078",d:"medium",cat:"Cotton",q:"Which is NOT a major cotton-producing state?",opts:["Kerala","Maharashtra","Gujarat","Madhya Pradesh"],a:0,exp:"Maharashtra, Gujarat, MP, Karnataka, AP, Punjab, Haryana, and Rajasthan are cotton belts; Kerala is not."},
  {id:"m079",d:"hard",cat:"Institutional Reforms",q:"'Consolidation of holdings' was a reform that aimed to:",opts:["Combine fragmented land parcels into one holding","Divide large farms among tenants","Introduce cash crops","Abolish irrigation canals"],a:0,exp:"Consolidation of holdings combined fragmented plots into a single holding for efficient farming."},
  {id:"m080",d:"medium",cat:"Food Security",q:"Special weather bulletins and agro-meteorological advisories help farmers by:",opts:["Providing timely information for planning agricultural activities","Replacing the need for irrigation","Eliminating pests permanently","Fixing crop prices"],a:0,exp:"Special weather bulletins help farmers plan sowing, irrigation and harvesting."},

  // ---- Irrigation ----
  {id:"m081",d:"easy",cat:"Irrigation",q:"Which is the most common source of irrigation in India?",opts:["Canals and wells","Rain barrels","Desalination plants","Glacial lakes"],a:0,exp:"Canals and wells (including tube wells) together account for the largest share of net irrigated area."},
  {id:"m082",d:"medium",cat:"Irrigation",q:"Drip irrigation is especially useful because it:",opts:["Delivers water directly to plant roots, minimising wastage","Floods the entire field uniformly","Requires no water source","Works only for rice"],a:0,exp:"Drip irrigation conserves water by delivering it drop by drop to the root zone."},
  {id:"m083",d:"medium",cat:"Irrigation",q:"Sprinkler irrigation is best suited for:",opts:["Undulating land with uneven relief","Perfectly flat paddy fields only","Desert dunes with no crops","Only for tea plantations"],a:0,exp:"Sprinkler irrigation is suitable for uneven land and sandy soils where canal irrigation isn't feasible."},
  {id:"m084",d:"hard",cat:"Irrigation",q:"Why is irrigation particularly important in western and southern parts of India?",opts:["Because rainfall is uncertain and inadequate for agriculture there","Because these regions receive more than 300 cm rainfall","Because these areas have no soil at all","Because crops there don't need water"],a:0,exp:"Uncertain, insufficient rainfall makes irrigation essential in states like Rajasthan, Gujarat and parts of the Deccan."},

  // ---- Assertion & Reason ----
  {id:"m085",d:"hard",cat:"Assertion-Reason",q:"Assertion (A): Rice cultivation is possible in low-rainfall areas of Punjab and Haryana.\nReason (R): These states have well-developed irrigation infrastructure.\nChoose the correct option.",opts:["Both A and R are true, and R correctly explains A","Both A and R are true, but R does not explain A","A is true but R is false","A is false but R is true"],a:0,exp:"Irrigation compensates for low rainfall, correctly explaining rice cultivation in these states."},
  {id:"m086",d:"hard",cat:"Assertion-Reason",q:"Assertion (A): Pulses are important in Indian agriculture.\nReason (R): Being leguminous crops, they help restore soil fertility by nitrogen fixation.\nChoose the correct option.",opts:["Both A and R are true, and R correctly explains A","Both A and R are true, but R does not explain A","A is true but R is false","Both A and R are false"],a:0,exp:"Pulses fix atmospheric nitrogen, which directly explains their importance for soil health."},
  {id:"m087",d:"hard",cat:"Assertion-Reason",q:"Assertion (A): The Green Revolution mainly benefited Punjab, Haryana and western Uttar Pradesh.\nReason (R): These regions had strong irrigation networks and adopted HYV seeds early.\nChoose the correct option.",opts:["Both A and R are true, and R correctly explains A","Both A and R are true, but R does not explain A","A is true but R is false","A is false but R is true"],a:0,exp:"Irrigation and early HYV adoption in these states directly explain the concentrated benefit of the Green Revolution there."},
  {id:"m088",d:"hard",cat:"Assertion-Reason",q:"Assertion (A): Tea is grown mainly in hilly, well-drained areas.\nReason (R): Tea bushes cannot tolerate waterlogging.\nChoose the correct option.",opts:["Both A and R are true, and R correctly explains A","Both A and R are true, but R does not explain A","A is true but R is false","A is false but R is true"],a:0,exp:"Tea needs well-drained soil precisely because its roots cannot tolerate standing water."},
  {id:"m089",d:"hard",cat:"Assertion-Reason",q:"Assertion (A): India has achieved self-sufficiency in food grain production.\nReason (R): This is entirely due to increased use of chemical pesticides alone.\nChoose the correct option.",opts:["A is true but R is false (self-sufficiency owes to HYV seeds, irrigation and fertilisers together, not pesticides alone)","Both A and R are true, and R correctly explains A","A is false but R is true","Both A and R are false"],a:0,exp:"Self-sufficiency resulted from combined Green Revolution inputs — HYV seeds, irrigation, fertilisers — not pesticides in isolation."},

  // ---- Case-based / Competency-based ----
  {id:"m090",d:"hard",cat:"Case-based",q:"A farmer in Punjab wants to switch from wheat to a Zaid-season crop to use his field productively in the summer gap. Which crop should he choose?",opts:["Watermelon or cucumber","Wheat","Mustard","Tea"],a:0,exp:"Watermelon, cucumber and other vegetables are typical Zaid crops grown in the short summer season."},
  {id:"m091",d:"hard",cat:"Case-based",q:"A student reads that a region has 'red and black soil, hot climate, and 210 frost-free days'. Which cash crop is this region most likely suited for?",opts:["Cotton","Tea","Wheat","Jute"],a:0,exp:"These are the classic climatic and soil requirements for cotton cultivation in the Deccan."},
  {id:"m092",d:"hard",cat:"Case-based",q:"A village in West Bengal has fertile flood-plain soil that gets renewed every year by river silt. Which fibre crop would grow best there?",opts:["Jute","Cotton","Rubber","Wheat"],a:0,exp:"Jute thrives in the flood plains of West Bengal, where fresh alluvium is deposited annually."},
  {id:"m093",d:"medium",cat:"Case-based",q:"A teacher tells students that a certain scheme protects farmers if their crop is destroyed by unseasonal rain or drought. Which scheme is she describing?",opts:["Crop Insurance","Kisan Credit Card","Minimum Support Price","Consolidation of Holdings"],a:0,exp:"Crop insurance schemes compensate farmers for losses due to natural calamities."},
  {id:"m094",d:"medium",cat:"Competency-based",q:"If the monsoon is delayed by a month, which cropping season is affected first?",opts:["Kharif","Rabi","Zaid","None, monsoon timing doesn't matter"],a:0,exp:"Kharif crops are sown with the onset of monsoon, so a delay directly affects Kharif sowing."},
  {id:"m095",d:"medium",cat:"Competency-based",q:"A farmer notices his rice yield has plateaued despite using more fertiliser. What is the most likely long-term solution suggested by sustainable agriculture practices?",opts:["Adopt organic farming / balanced nutrient management","Use even more chemical fertiliser","Abandon rice farming entirely","Switch to Jhumming"],a:0,exp:"Excess chemical fertiliser can degrade soil health over time; balanced or organic practices help restore productivity."},
  {id:"m096",d:"medium",cat:"Competency-based",q:"Two neighbouring states have the same rainfall, but one produces more rice. What is the most likely reason?",opts:["Differences in soil fertility, irrigation or technology adoption","Rice does not depend on any of these factors","One state simply has more people","Rice yield never varies between states"],a:0,exp:"Soil quality, irrigation coverage and farming technology explain productivity differences even under similar rainfall."},

  // ---- More Institutional / Technological Reforms ----
  {id:"m097",d:"medium",cat:"Institutional Reforms",q:"e-NAM (National Agriculture Market) is a platform that helps farmers by:",opts:["Connecting agricultural markets online for better price discovery","Providing free irrigation water","Replacing the need for MSP","Growing crops automatically"],a:0,exp:"e-NAM is an online trading platform linking existing APMC mandis for transparent price discovery."},
  {id:"m098",d:"medium",cat:"Institutional Reforms",q:"The Public Distribution System (PDS) is linked to agriculture because it:",opts:["Distributes foodgrains from buffer stocks to the poor at subsidised rates","Grows crops directly for farmers","Sets irrigation schedules","Replaces the need for farming"],a:0,exp:"PDS distributes food grains procured from farmers (often via MSP) to vulnerable sections of society."},
  {id:"m099",d:"medium",cat:"Institutional Reforms",q:"Buffer stock refers to:",opts:["Food grain stock procured by the government for distribution during shortage","A type of fertiliser","A crop insurance scheme","A type of irrigation canal"],a:0,exp:"Buffer stock is the reserve of food grains maintained by the government (via FCI) for food security."},
  {id:"m100",d:"medium",cat:"Institutional Reforms",q:"Contract farming involves:",opts:["An agreement between farmers and buyers/companies before the crop is grown","Farmers competing against each other","Government seizing farm land","A ban on selling crops"],a:0,exp:"Contract farming links farmers with agribusiness firms through pre-agreed terms of production and sale."},

  // ---- More Soil & Climate ----
  {id:"m101",d:"easy",cat:"Soil",q:"Which soil type is best suited for cotton cultivation?",opts:["Black soil","Laterite soil","Desert soil","Peaty soil"],a:0,exp:"Black (regur) soil of the Deccan Plateau is ideal for cotton due to its moisture-retention capacity."},
  {id:"m102",d:"medium",cat:"Soil",q:"Alluvial soil, found in river plains, is especially suitable for:",opts:["Rice and wheat cultivation","Rubber only","Desert shrubs","Tea plantations exclusively"],a:0,exp:"Fertile alluvial soil in the Indo-Gangetic plains supports intensive rice and wheat cultivation."},
  {id:"m103",d:"medium",cat:"Climate",q:"Which climatic factor most directly determines the difference between Rabi and Kharif crops?",opts:["Temperature and rainfall patterns across seasons","Soil colour only","Distance from the equator","Number of farmers in the region"],a:0,exp:"Seasonal changes in temperature and monsoon rainfall define which crops can be sown as Rabi or Kharif."},

  // ---- More on Major Producing States ----
  {id:"m104",d:"medium",cat:"Major States",q:"Which state leads in groundnut production in India?",opts:["Gujarat","Punjab","Kerala","West Bengal"],a:0,exp:"Gujarat is a leading groundnut-producing state along with Andhra Pradesh and Tamil Nadu."},
  {id:"m105",d:"medium",cat:"Major States",q:"Punjab and Haryana are especially known for high production of:",opts:["Wheat and rice (Green Revolution belt)","Tea and coffee","Rubber and coconut","Jute and rice only"],a:0,exp:"Punjab and Haryana became the core of the Green Revolution, leading in wheat and irrigated rice."},
  {id:"m106",d:"hard",cat:"Major States",q:"Which state is the largest producer of cotton in India (as per NCERT-era data)?",opts:["Gujarat","Punjab","West Bengal","Kerala"],a:0,exp:"Gujarat, Maharashtra and Madhya Pradesh are the top cotton-producing states."},

  // ---- More on Cropping Intensity & Land Use ----
  {id:"m107",d:"hard",cat:"Land Use",q:"'Cropping intensity' refers to:",opts:["The number of times land is cropped in a year","The strength of the crop's flavour","The height of the crop plant","The colour of the crop"],a:0,exp:"Cropping intensity measures how many times a field is used for growing crops within an agricultural year."},
  {id:"m108",d:"hard",cat:"Land Use",q:"Multiple cropping (growing more than one crop on the same field in a year) helps farmers mainly by:",opts:["Increasing total farm income and land-use efficiency","Reducing soil fertility permanently","Making irrigation unnecessary","Eliminating the need for fertilisers"],a:0,exp:"Multiple cropping raises productivity and income per unit of land over the year."},

  // ---- More on Green Revolution / Mechanisation ----
  {id:"m109",d:"medium",cat:"Green Revolution",q:"One criticism of the Green Revolution is that it led to:",opts:["Regional disparities, favouring irrigated areas over rain-fed ones","Complete elimination of food scarcity everywhere","No environmental impact whatsoever","A decline in wheat production"],a:0,exp:"The Green Revolution's benefits were concentrated in irrigated regions, widening regional inequality."},
  {id:"m110",d:"medium",cat:"Green Revolution",q:"Mechanisation of agriculture (tractors, harvesters) mainly helps by:",opts:["Increasing efficiency and reducing labour time on large farms","Making irrigation unnecessary","Automatically improving soil fertility","Replacing the need for seeds"],a:0,exp:"Mechanisation speeds up sowing, harvesting, and other operations, especially on large commercial farms."},

  // ---- More scattered factual MCQs across categories to round out coverage ----
  {id:"m111",d:"easy",cat:"Rice",q:"Which of these states grows rice using irrigation despite low rainfall?",opts:["Punjab","Kerala","Assam","West Bengal"],a:0,exp:"Punjab, with irrigation support, grows rice despite comparatively low natural rainfall."},
  {id:"m112",d:"easy",cat:"Wheat",q:"Wheat cultivation depends on adequate:",opts:["Winter rainfall / irrigation and a cool climate","Tropical heat year-round","Saline soil","High humidity throughout the year"],a:0,exp:"Wheat needs a cool climate and moisture during winter, often supplemented by irrigation."},
  {id:"m113",d:"medium",cat:"Millets",q:"Which of these is NOT a millet?",opts:["Sugarcane","Jowar","Bajra","Ragi"],a:0,exp:"Sugarcane is a cash crop, not a millet; jowar, bajra and ragi are the coarse-grain millets."},
  {id:"m114",d:"medium",cat:"Oilseeds",q:"Sesamum (til) is grown as which season's crop in North India, and Rabi in South India?",opts:["Kharif","Zaid only","Only Rabi everywhere","Not grown in India"],a:0,exp:"Sesamum is grown as a Kharif crop in North India and as a Rabi crop in South India."},
  {id:"m115",d:"hard",cat:"Cash Crops",q:"Which of the following best describes 'cash crops'?",opts:["Crops grown mainly to be sold in the market for profit","Crops that are always food grains","Crops grown only for the farmer's own family","Crops that need no water"],a:0,exp:"Cash crops like cotton, jute, sugarcane and oilseeds are cultivated primarily for sale, not home consumption."},
  {id:"m116",d:"hard",cat:"Economy",q:"Which of these best explains why agriculture is called the backbone of the Indian economy?",opts:["It supports livelihoods of a majority of the rural population and feeds allied industries","It contributes zero to GDP","It only affects urban areas","It has no linkage with other sectors"],a:0,exp:"Agriculture supports rural livelihoods directly and supplies raw material to numerous agro-based industries."},
  {id:"m117",d:"medium",cat:"Food Security",q:"Food security in India rests on three pillars: availability, access and:",opts:["Affordability","Advertising","Automation","Aviation"],a:0,exp:"Food security requires food to be available, accessible, and affordable to all sections of society."},
  {id:"m118",d:"medium",cat:"Globalization",q:"Under globalization, Indian agriculture faces competition mainly from:",opts:["Highly subsidised agricultural produce from other countries","Only domestic farmers","No external competition at all","Only the fishing industry"],a:0,exp:"Cheaper, subsidised imports from other countries create competitive pressure on Indian farmers."},
  {id:"m119",d:"easy",cat:"Organic Farming",q:"Which of these is used as fertiliser in organic farming?",opts:["Cow dung / compost manure","Synthetic urea only","Petroleum-based chemicals","Plastic mulch only"],a:0,exp:"Organic farming relies on manure, compost, and biological methods rather than synthetic chemicals."},
  {id:"m120",d:"hard",cat:"Organic Farming",q:"A likely long-term benefit of shifting a farm to organic methods is:",opts:["Improved soil health and reduced chemical runoff into water bodies","Immediate doubling of yield in the very first year","Complete elimination of the need for water","No change in soil quality at all"],a:0,exp:"Organic farming tends to improve soil structure and reduce chemical pollution over time, though yields may take time to stabilise."}
];

const TF_BANK = [
  {id:"t001",d:"easy",cat:"Cropping Seasons",q:"Rice is grown in the Rabi season across all of India.",a:false,exp:"Rice is primarily a Kharif crop, though it is grown in Rabi season in a few states with irrigation."},
  {id:"t002",d:"easy",cat:"Farming Types",q:"Jhumming is a form of shifting cultivation.",a:true,exp:"Jhumming, practised in North-East India, is a type of shifting/slash-and-burn cultivation."},
  {id:"t003",d:"easy",cat:"Jute",q:"Jute is known as the Golden Fibre.",a:true,exp:"Jute is called the Golden Fibre due to its colour and value."},
  {id:"t004",d:"medium",cat:"Wheat",q:"Uttar Pradesh is the largest producer of wheat in India.",a:true,exp:"UP leads wheat production, followed by Punjab and Haryana."},
  {id:"t005",d:"easy",cat:"Pulses",q:"India is the largest producer and consumer of pulses in the world.",a:true,exp:"India leads globally in both pulses production and consumption."},
  {id:"t006",d:"medium",cat:"Tea",q:"Tea plantations require abundant, cheap and skilled labour.",a:true,exp:"Tea cultivation is labour-intensive and needs skilled workers throughout the year."},
  {id:"t007",d:"medium",cat:"Cotton",q:"Cotton is best suited to the alluvial soils of the Ganga plain.",a:false,exp:"Cotton grows best in black soil of the Deccan Plateau, not alluvial soil."},
  {id:"t008",d:"easy",cat:"Rubber",q:"Rubber is an equatorial crop, but also grows under tropical and sub-tropical conditions.",a:true,exp:"Rubber originally an equatorial crop, is now grown in tropical/sub-tropical regions like Kerala."},
  {id:"t009",d:"medium",cat:"Green Revolution",q:"The Green Revolution led to India's self-sufficiency in food grains.",a:true,exp:"The Green Revolution of the 1960s made India self-sufficient in food grain production."},
  {id:"t010",d:"medium",cat:"Institutional Reforms",q:"MSP stands for Maximum Selling Price.",a:false,exp:"MSP stands for Minimum Support Price, announced to protect farmers from price fluctuations."},
  {id:"t011",d:"easy",cat:"Sugarcane",q:"India is the world's largest producer of sugarcane.",a:false,exp:"India is the second largest producer of sugarcane, after Brazil."},
  {id:"t012",d:"medium",cat:"Oilseeds",q:"Groundnut is a Rabi season crop in India.",a:false,exp:"Groundnut is primarily grown in the Kharif season."},
  {id:"t013",d:"easy",cat:"Coffee",q:"Indian coffee is famous internationally for its poor quality.",a:false,exp:"Indian coffee, especially the Arabica variety, is known for good quality."},
  {id:"t014",d:"hard",cat:"Farming Types",q:"Commercial farming has a lower degree of mechanisation than subsistence farming.",a:false,exp:"Commercial farming has a HIGHER degree of mechanisation than subsistence farming."},
  {id:"t015",d:"medium",cat:"Organic Farming",q:"Organic farming relies on chemical fertilisers for higher yield.",a:false,exp:"Organic farming avoids chemical fertilisers and pesticides, using organic manure instead."},
  {id:"t016",d:"easy",cat:"Millets",q:"Jowar, bajra and ragi are known as coarse grains.",a:true,exp:"These millets are collectively known as coarse grains, rich in nutrients."},
  {id:"t017",d:"medium",cat:"Rice",q:"Rice requires high temperature and high humidity for cultivation.",a:true,exp:"Rice is a Kharif crop needing temperature above 25°C and high humidity."},
  {id:"t018",d:"medium",cat:"Globalization",q:"WTO agreements have had no impact on Indian agriculture.",a:false,exp:"WTO agreements have significantly influenced cropping patterns and trade in Indian agriculture."},
  {id:"t019",d:"hard",cat:"Institutional Reforms",q:"Consolidation of holdings and abolition of zamindari were part of land reforms.",a:true,exp:"Both were key institutional/land reforms undertaken after Independence."},
  {id:"t020",d:"easy",cat:"Cash Crops",q:"Cash crops are grown for the farmer's own consumption, not for sale.",a:false,exp:"Cash crops like cotton, sugarcane and oilseeds are grown mainly for sale in the market."},
  {id:"t021",d:"medium",cat:"Horticulture",q:"India is the world's largest producer of mangoes.",a:true,exp:"India leads global mango production."},
  {id:"t022",d:"easy",cat:"Cropping Seasons",q:"Zaid is a season between Rabi and Kharif.",a:true,exp:"Zaid is the short summer cropping season between Rabi and Kharif."},
  {id:"t023",d:"medium",cat:"Wheat",q:"Wheat needs a hot and humid climate throughout its growth cycle.",a:false,exp:"Wheat needs a cool growing season and bright sunshine at the time of ripening."},
  {id:"t024",d:"medium",cat:"Jute",q:"West Bengal is a leading producer of jute in India.",a:true,exp:"West Bengal, Bihar and Assam lead jute production."},
  {id:"t025",d:"hard",cat:"Economy",q:"Agriculture has no role in supplying raw material to industries.",a:false,exp:"Agriculture supplies raw materials to agro-based industries like sugar, textiles and food processing."},
  {id:"t026",d:"easy",cat:"Irrigation",q:"Canals and wells are among the most common sources of irrigation in India.",a:true,exp:"Canals and wells (including tube wells) supply the largest share of irrigated area in India."},
  {id:"t027",d:"medium",cat:"Irrigation",q:"Drip irrigation wastes more water than flood irrigation.",a:false,exp:"Drip irrigation is far more water-efficient than flood irrigation since it targets the root zone directly."},
  {id:"t028",d:"medium",cat:"Institutional Reforms",q:"e-NAM is an online platform that helps connect agricultural markets across India.",a:true,exp:"e-NAM (National Agriculture Market) links APMC mandis for transparent online trading."},
  {id:"t029",d:"medium",cat:"Institutional Reforms",q:"Buffer stock refers to food grains kept in reserve by the government for distribution during shortage.",a:true,exp:"Buffer stock, managed largely by the FCI, ensures food security during shortages."},
  {id:"t030",d:"hard",cat:"Green Revolution",q:"The Green Revolution benefited all regions of India equally.",a:false,exp:"Its benefits were concentrated mainly in irrigated states like Punjab, Haryana and western UP."},
  {id:"t031",d:"easy",cat:"Soil",q:"Black soil is well suited for cotton cultivation.",a:true,exp:"Black (regur) soil retains moisture well, which suits cotton."},
  {id:"t032",d:"medium",cat:"Major States",q:"Gujarat is a leading producer of groundnut in India.",a:true,exp:"Gujarat, along with Andhra Pradesh and Tamil Nadu, leads groundnut production."},
  {id:"t033",d:"medium",cat:"Land Use",q:"Cropping intensity refers to the number of times land is cropped in an agricultural year.",a:true,exp:"Higher cropping intensity means the same land is used for more crop cycles in a year."},
  {id:"t034",d:"medium",cat:"Case-based",q:"Watermelon and cucumber are typically grown in the Zaid season.",a:true,exp:"These short-duration crops are grown in the summer Zaid season between Rabi and Kharif."},
  {id:"t035",d:"medium",cat:"Food Security",q:"The Public Distribution System (PDS) has no connection to agricultural procurement.",a:false,exp:"PDS distributes food grains that are largely procured from farmers via mechanisms like MSP."},
  {id:"t036",d:"hard",cat:"Contract Farming",q:"Contract farming involves an agreement between farmers and buyers before the crop is grown.",a:true,exp:"Under contract farming, terms of production and sale are agreed upon in advance."},
  {id:"t037",d:"easy",cat:"Rice",q:"Rice can be grown in the Rabi season in some states with irrigation, such as West Bengal.",a:true,exp:"With irrigation, rice is also grown in the Rabi season in states like WB, Odisha, AP and TN."},
  {id:"t038",d:"medium",cat:"Mechanisation",q:"Mechanisation of agriculture generally increases efficiency on large farms.",a:true,exp:"Tractors and harvesters speed up farm operations, especially on large commercial holdings."},
  {id:"t039",d:"hard",cat:"Cotton",q:"Cotton requires waterlogged soil to grow well.",a:false,exp:"Cotton actually requires well-drained black soil and cannot tolerate waterlogging."}
];

const FILL_BANK = [
  {id:"f001",d:"easy",cat:"Cropping Seasons",q:"The three cropping seasons of India are Rabi, Kharif and ______.",a:"zaid",exp:"Zaid is the short summer season between Rabi and Kharif."},
  {id:"f002",d:"easy",cat:"Jute",q:"Jute is popularly known as the ______ Fibre.",a:"golden",exp:"Jute's colour and value earned it the name 'Golden Fibre'."},
  {id:"f003",d:"medium",cat:"Farming Types",q:"Shifting cultivation is known as ______ in North-East India.",a:"jhumming",exp:"Jhumming is the local name for shifting/slash-and-burn cultivation in the North-East."},
  {id:"f004",d:"medium",cat:"Institutional Reforms",q:"______ is the price announced by the government before the sowing season to protect farmers.",a:"minimum support price",exp:"MSP (Minimum Support Price) shields farmers from price fluctuations."},
  {id:"f005",d:"medium",cat:"Green Revolution",q:"The ______ Revolution refers to the increase in milk production in India.",a:"white",exp:"The White Revolution (Operation Flood) boosted milk production."},
  {id:"f006",d:"easy",cat:"Wheat",q:"______ is the largest wheat-producing state in India.",a:"uttar pradesh",exp:"Uttar Pradesh leads wheat production, followed by Punjab and Haryana."},
  {id:"f007",d:"medium",cat:"Cotton",q:"Cotton is the raw material for the ______ textile industry.",a:"cotton",exp:"Cotton is the basic raw material for the cotton textile industry."},
  {id:"f008",d:"easy",cat:"Tea",q:"______ is the largest tea-producing state in India.",a:"assam",exp:"Assam produces the largest share of India's tea."},
  {id:"f009",d:"medium",cat:"Rubber",q:"Rubber is mainly grown in Kerala, Tamil Nadu and the ______ Islands.",a:"andaman and nicobar",exp:"The Andaman & Nicobar Islands and Garo hills also grow rubber."},
  {id:"f010",d:"hard",cat:"Institutional Reforms",q:"The first major land reform after independence was the abolition of the ______ system.",a:"zamindari",exp:"The Zamindari system was abolished to redistribute land ownership."},
  {id:"f011",d:"easy",cat:"Pulses",q:"India is the world's largest producer as well as ______ of pulses.",a:"consumer",exp:"India both produces and consumes the most pulses in the world."},
  {id:"f012",d:"medium",cat:"Sugarcane",q:"India is the world's second largest producer of sugarcane after ______.",a:"brazil",exp:"Brazil is the largest producer, India is second."},
  {id:"f013",d:"easy",cat:"Rice",q:"Rice is mainly a crop of the ______ season.",a:"kharif",exp:"Rice is a Kharif crop requiring high temperature and humidity."},
  {id:"f014",d:"medium",cat:"Millets",q:"Jowar, bajra and ragi are together known as ______ grains.",a:"coarse",exp:"These nutritious millets are called coarse grains."},
  {id:"f015",d:"hard",cat:"Globalization",q:"______ stands for World Trade Organisation, which affects agricultural trade policy.",a:"wto",exp:"WTO agreements influence Indian farmers' choice of crops and trade rules."},
  {id:"f016",d:"medium",cat:"Irrigation",q:"______ irrigation delivers water drop by drop directly to plant roots, saving water.",a:"drip",exp:"Drip irrigation minimises water wastage by targeting the root zone."},
  {id:"f017",d:"medium",cat:"Institutional Reforms",q:"______ is the online platform (National Agriculture Market) that links mandis across India.",a:"e-nam",exp:"e-NAM connects APMC markets electronically for transparent price discovery."},
  {id:"f018",d:"medium",cat:"Food Security",q:"The government maintains a ______ stock of food grains for distribution during shortages.",a:"buffer",exp:"Buffer stock is the reserve maintained mainly through the Food Corporation of India."},
  {id:"f019",d:"easy",cat:"Soil",q:"______ soil, found in the Deccan Plateau, is best suited for cotton cultivation.",a:"black",exp:"Black (regur) soil retains moisture and suits cotton well."},
  {id:"f020",d:"medium",cat:"Groundnut",q:"______ is the leading groundnut-producing state in India.",a:"gujarat",exp:"Gujarat leads groundnut production, along with Andhra Pradesh and Tamil Nadu."},
  {id:"f021",d:"hard",cat:"Land Use",q:"______ ______ refers to the number of times land is cropped in one agricultural year.",a:"cropping intensity",exp:"Cropping intensity reflects how many crop cycles a field goes through annually."},
  {id:"f022",d:"medium",cat:"Contract Farming",q:"______ farming is an arrangement where buyers and farmers agree on production terms before sowing.",a:"contract",exp:"Contract farming links farmers with agribusiness firms via pre-agreed terms."},
  {id:"f023",d:"easy",cat:"Cropping Seasons",q:"Wheat, gram, and mustard are examples of ______ season crops.",a:"rabi",exp:"These are grown in winter and harvested in summer as Rabi crops."},
  {id:"f024",d:"medium",cat:"Economy",q:"Agriculture is often called the ______ of the Indian economy.",a:"backbone",exp:"Agriculture supports rural livelihoods and feeds many allied industries."}
];

/* Match the Following pairs — grouped by relationship type */
const MATCH_BANK = [
  {
    id:"g001", title:"Crop → Season",
    pairs:[
      {left:"Rice", right:"Kharif"},
      {left:"Wheat", right:"Rabi"},
      {left:"Watermelon", right:"Zaid"},
      {left:"Mustard", right:"Rabi"},
      {left:"Cotton", right:"Kharif"}
    ]
  },
  {
    id:"g002", title:"Crop → Leading State",
    pairs:[
      {left:"Tea", right:"Assam"},
      {left:"Wheat", right:"Uttar Pradesh"},
      {left:"Jute", right:"West Bengal"},
      {left:"Ragi", right:"Karnataka"},
      {left:"Rubber", right:"Kerala"}
    ]
  },
  {
    id:"g003", title:"Crop → Soil Type",
    pairs:[
      {left:"Cotton", right:"Black Soil"},
      {left:"Jute", right:"Alluvial Soil (Flood Plains)"},
      {left:"Tea", right:"Humus-rich Well-drained Soil"},
      {left:"Bajra", right:"Sandy Soil"},
      {left:"Rice", right:"Clayey / Alluvial Soil"}
    ]
  },
  {
    id:"g004", title:"Crop → Climate Need",
    pairs:[
      {left:"Rice", right:"High Temp. & High Humidity"},
      {left:"Wheat", right:"Cool Growing Season"},
      {left:"Rubber", right:"Hot & Humid, >200cm Rain"},
      {left:"Cotton", right:"210 Frost-free Days"},
      {left:"Coffee", right:"Warm Hill Climate"}
    ]
  },
  {
    id:"g005", title:"Term → Meaning",
    pairs:[
      {left:"Jhumming", right:"Shifting Cultivation"},
      {left:"MSP", right:"Minimum Support Price"},
      {left:"Golden Fibre", right:"Jute"},
      {left:"White Revolution", right:"Milk Production Boost"},
      {left:"Green Revolution", right:"HYV Seed-led Food Grain Boom"}
    ]
  },
  {
    id:"g006", title:"Reform → Purpose",
    pairs:[
      {left:"Zamindari Abolition", right:"End Intermediary Land Ownership"},
      {left:"Consolidation of Holdings", right:"Combine Fragmented Plots"},
      {left:"Kisan Credit Card", right:"Farm Input Loans"},
      {left:"Crop Insurance", right:"Cover Losses from Calamities"},
      {left:"e-NAM", right:"Online Market Linkage"}
    ]
  }
];

/* Image Identification — farming tools & irrigation methods (emoji-based,
   see README for swapping in real photographs). */
const TOOLS_BANK = [
  {id:"tl001", emoji:"🪓", name:"Sickle", cat:"tool", clue:"Curved hand tool used for harvesting crops like wheat and rice"},
  {id:"tl002", emoji:"🚜", name:"Tractor", cat:"tool", clue:"Mechanised vehicle used for ploughing, sowing and hauling on commercial farms"},
  {id:"tl003", emoji:"🪃", name:"Plough", cat:"tool", clue:"Traditional implement pulled by bullocks or tractors to turn the soil"},
  {id:"tl004", emoji:"🧑‍🌾", name:"Hoe", cat:"tool", clue:"Hand tool for weeding and loosening soil, common in primitive subsistence farming"},
  {id:"tl005", emoji:"🌾", name:"Winnowing Fan", cat:"tool", clue:"Flat woven tool used to separate grain from chaff"},
  {id:"tl006", emoji:"🚿", name:"Sprinkler", cat:"irrigation", clue:"Sprays water like rainfall — suited to uneven, sandy land"},
  {id:"tl007", emoji:"💧", name:"Drip Irrigation", cat:"irrigation", clue:"Delivers water drop by drop directly to plant roots to save water"},
  {id:"tl008", emoji:"🕳️", name:"Tube Well", cat:"irrigation", clue:"Bores deep underground to draw groundwater for irrigation"},
  {id:"tl009", emoji:"🛶", name:"Canal", cat:"irrigation", clue:"Channel that carries river water to distant fields"},
  {id:"tl010", emoji:"🪣", name:"Well", cat:"irrigation", clue:"Traditional dug source of groundwater, often paired with a pulley or motor"},
  {id:"tl011", emoji:"🏞️", name:"Tank Irrigation", cat:"irrigation", clue:"Water stored in a small reservoir, common in the Deccan Plateau"},
  {id:"tl012", emoji:"🌱", name:"Seed Drill", cat:"tool", clue:"Mechanised tool that sows seeds at a uniform depth and spacing"}
];

/* Map Challenge — a clickable state-grid (rather than an SVG geo-map, see
   README) linking major crops to their leading producing states. */
const STATE_BANK = [
  {id:"mp001", crop:"Tea", correct:"Assam", options:["Assam","Punjab","Rajasthan","Kerala"], clue:"Along with Darjeeling & Jalpaiguri hills"},
  {id:"mp002", crop:"Wheat", correct:"Uttar Pradesh", options:["Uttar Pradesh","Kerala","Odisha","Tamil Nadu"], clue:"India's largest wheat-producing state"},
  {id:"mp003", crop:"Jute", correct:"West Bengal", options:["West Bengal","Gujarat","Punjab","Karnataka"], clue:"Golden Fibre grown in the Ganga delta"},
  {id:"mp004", crop:"Rubber", correct:"Kerala", options:["Kerala","Haryana","Rajasthan","Bihar"], clue:"Warm, humid, more than 200cm rainfall"},
  {id:"mp005", crop:"Groundnut", correct:"Gujarat", options:["Gujarat","Himachal Pradesh","Punjab","Assam"], clue:"India's leading oilseed-producing state"},
  {id:"mp006", crop:"Ragi", correct:"Karnataka", options:["Karnataka","Punjab","Haryana","Uttarakhand"], clue:"Nutritious millet grown on red/black soils"},
  {id:"mp007", crop:"Cotton", correct:"Gujarat", options:["Gujarat","West Bengal","Kerala","Assam"], clue:"Black soil, over 210 frost-free days"},
  {id:"mp008", crop:"Coffee", correct:"Karnataka", options:["Karnataka","Punjab","Bihar","Odisha"], clue:"Nilgiri hills, Arabica variety"},
  {id:"mp009", crop:"Rice (Rabi season)", correct:"West Bengal", options:["West Bengal","Rajasthan","Punjab","Haryana"], clue:"Grown with irrigation even outside Kharif season"},
  {id:"mp010", crop:"Bajra", correct:"Rajasthan", options:["Rajasthan","Kerala","Assam","West Bengal"], clue:"Sandy soil, drought-tolerant millet"}
];
const INDIA_STATE_GRID = ["Punjab","Haryana","Rajasthan","Gujarat","Uttar Pradesh","Bihar","West Bengal","Assam","Odisha","Madhya Pradesh","Maharashtra","Karnataka","Kerala","Tamil Nadu","Andhra Pradesh","Himachal Pradesh","Uttarakhand"];

/* Crop Detective — progressive clue reveal, hardest clue first isn't used;
   clues run general → specific. */
const CLUE_BANK = [
  {id:"cd001", name:"Rice", clues:["I am a Kharif crop.","I need high temperature and high humidity to grow.","I need more than 100cm of rainfall, or irrigation where rainfall is low."]},
  {id:"cd002", name:"Wheat", clues:["I am a Rabi crop.","I need a cool growing season.","I ripen best under bright sunshine — I'm India's second most important cereal."]},
  {id:"cd003", name:"Cotton", clues:["I am a cash crop, not a food crop.","I grow best in black soil.","I need around 210 frost-free days and am the raw material for textile mills."]},
  {id:"cd004", name:"Tea", clues:["I am a plantation crop.","I need a labour-intensive harvest, picked by hand.","Assam and the Darjeeling hills are my biggest home in India."]},
  {id:"cd005", name:"Jute", clues:["I am called a 'fibre' crop.","I grow best on flood-plain soil renewed yearly.","People call me the Golden Fibre — West Bengal grows the most of me."]},
  {id:"cd006", name:"Sugarcane", clues:["I am a tropical and sub-tropical crop.","I need hot, humid conditions and 75-100cm rainfall.","Sugar and gur are both made from me."]},
  {id:"cd007", name:"Rubber", clues:["I originated as an equatorial crop.","I need over 200cm of rainfall a year.","Kerala and Tamil Nadu grow me for industrial raw material."]},
  {id:"cd008", name:"Coffee", clues:["I am grown on hill plantations.","My Arabica variety is famous worldwide for quality.","The Nilgiri hills of Karnataka, Kerala and Tamil Nadu are my home."]},
  {id:"cd009", name:"Groundnut", clues:["I am an oilseed, not a cereal.","I am mostly a Kharif season crop.","Gujarat leads my production in India."]},
  {id:"cd010", name:"Millets", clues:["I am known as a coarse grain.","Jowar, bajra and ragi are all types of me.","I am highly nutritious and drought-resistant."]}
];

/* Crop / Image identification — uses emoji + clue text since no external
   image assets are bundled (see README for swapping in real photos). */
const CROP_BANK = [
  {id:"c001", emoji:"🌾", name:"Rice", clue:"Kharif crop needing high humidity & temp above 25°C"},
  {id:"c002", emoji:"🌿", name:"Wheat", clue:"Rabi crop, cool season, ripens under bright sun"},
  {id:"c003", emoji:"🍵", name:"Tea", clue:"Plantation crop, Assam leads production"},
  {id:"c004", emoji:"☕", name:"Coffee", clue:"Grown in Nilgiri hills, Arabica variety famous"},
  {id:"c005", emoji:"🧵", name:"Cotton", clue:"Needs black soil & 210 frost-free days"},
  {id:"c006", emoji:"🎋", name:"Sugarcane", clue:"Raw material for sugar & gur, tropical crop"},
  {id:"c007", emoji:"🌻", name:"Millets", clue:"Jowar, bajra, ragi — the coarse grains"},
  {id:"c008", emoji:"🧺", name:"Jute", clue:"The Golden Fibre, grown in flood plains"},
  {id:"c009", emoji:"🌳", name:"Rubber", clue:"Equatorial crop, needs >200cm rainfall"},
  {id:"c010", emoji:"🌽", name:"Maize", clue:"Food & fodder crop, 21-27°C, old alluvial soil"}
];

// Utility: shuffled full pool + fisher-yates
function shuffleArray(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

const QUESTION_COUNTS = {
  mcq: MCQ_BANK.length,
  tf: TF_BANK.length,
  fill: FILL_BANK.length,
  match: MATCH_BANK.reduce((s,g)=>s+g.pairs.length,0),
  crop: CROP_BANK.length,
  tools: TOOLS_BANK.length,
  map: STATE_BANK.length,
  detective: CLUE_BANK.length
};
QUESTION_COUNTS.total = QUESTION_COUNTS.mcq + QUESTION_COUNTS.tf + QUESTION_COUNTS.fill + QUESTION_COUNTS.match + QUESTION_COUNTS.crop + QUESTION_COUNTS.tools + QUESTION_COUNTS.map + QUESTION_COUNTS.detective;
