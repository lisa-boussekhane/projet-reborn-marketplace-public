const { product } = require ('../Models/product');

const productController = {
async getProductPage (req, res){
    try{
              
        const productId = req.params.id;
        const product = await product.findByPk({productId,
          include: [
            { model: detail_product, required: true },
            { model: media, required: false }
          ]
        }).then(product => {
          console.log(product);
        });
        
        if (!product){
        return res.status(404).json({ message: `product with id ${productId} not found.`});
        }
        
        res.status(200).json(product);
        
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'an unexpected error occured...'});
    }
    },

async createProduct(req, res){
    
    try{
          const { title, kit_name, sculptor, size, type, weight, age_range, authenticity_card, price, shipping_fees } = req.body;    
    
          const product = {};
    
        if (title === undefined || title === ""){
            return res.status(400).json({ message: 'title is mandatory'});
          }
    
          product.title = title;

          if (title){
            product.title = title;
          }
    
          if (kit_name){
            product.kit_name = kit_name;
          }

          if (sculptor){
            product.sculptor = sculptor;
          }

          if (size){
            product.size = size;
          }

          if (type){
            product.type = type;
          }

          if (weight){
            product.weight = weight;
          }

          if (age_range){
            product.age_range = age_range;
          }

          if (authenticity_card){
            product.authenticity_card = authenticity_card;
          }

        let priceInt;
        if (price !== undefined){
            priceInt = Number(price);

        if (isNaN(priceInt)){
          return res.status(400).json({ message: 'price should be an integer'});
        }

          if (price){
            product.price = price;
          }

        let shippingFeesInt;
          if (shipping_fees !== undefined){
            shippingFeesInt = Number(shipping_fees);
  
          if (isNaN(shippingFeesInt)){
            return res.status(400).json({ message: 'shipping fees should be an integer'});
          }

          if (shipping_fees){
            product.shipping_fees = shipping_fees;
          }
    
          const newProduct = await product.create(product);
    
          res.status(201).json(newProduct);
    
    }catch (error){
          console.error(error);
          res.status(500).json({ message: 'an unexpected error occured...'});
    }  
    
      }}},

async updateProduct(req, res){
    try{
          const productId = req.params.id;
          const product = await product.findByPk(productId);
    
          if (!product){
            return res.status(404).json({ message: `product with id ${productId} not found.`});
          }
    
          const { title, kit_name, sculptor, size, type, weight, age_range, authenticity_card, price, shipping_fees } = req.body;    

          if (title !== undefined && title === ""){
            return res.status(400).json({ message: 'name should not be an empty string'});
          }
    
          if (title){
            product.title = title;
          }
    
          if (kit_name){
            product.kit_name = kit_name;
          }

          if (sculptor){
            product.sculptor = sculptor;
          }

          if (size){
            product.size = size;
          }

          if (type){
            product.type = type;
          }

          if (weight){
            product.weight = weight;
          }

          if (age_range){
            product.age_range = age_range;
          }

          if (authenticity_card){
            product.authenticity_card = authenticity_card;
          }

        let priceInt;
        if (price !== undefined){
            priceInt = Number(price);

        if (isNaN(priceInt)){
          return res.status(400).json({ message: 'price should be an integer'});
        }

          if (price){
            product.price = price;
          }

        let shippingFeesInt;
          if (shipping_fees !== undefined){
            shippingFeesInt = Number(shipping_fees);
  
          if (isNaN(shippingFeesInt)){
            return res.status(400).json({ message: 'shipping fees should be an integer'});
          }

          if (shipping_fees){
            product.shipping_fees = shipping_fees;
          }
    
        await product.save();
    
          res.status(200).json(product);
        }
    
    }catch (error){
          console.error(error);
          res.status(500).json({ message: 'an unexpected error occured...'});
        }
      }},
    
async deleteProduct(req, res){
    try{
          const productId = req.params.id;
          const product = await product.findByPk(productId);
    
          if (!product){
            return res.status(404).json({ message: `product with id ${productId} not found.`});
          }
    
          await product.destroy();
    
          res.status(204).json();
    
    }catch (error){
          console.error(error);
          res.status(500).json({ message: 'an unexpected error occured...'});
        }   
    },

async getProductsPage(req, res){
    try{
          const products = await product.findAll({        
            order: [
              ['title'],
            ],
          });
          res.status(200).json(products);

    }catch (error){
          console.error(error);
          res.status(500).json({ message: 'an unexpected error occured...'});
        }
      },

};

module.exports = productController;