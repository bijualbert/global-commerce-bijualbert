import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Loader2 } from 'lucide-react';
import { fetchProducts, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ProductsSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    
    toast.success('Added to cart', {
      description: product.node.title,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Product Catalog</h1>
        <p className="text-muted-foreground">
          Manage GM merchandise and parts across all international markets
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card text-center py-16"
        >
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Products Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Your product catalog is empty. Create your first product by telling me what you'd like to sell and the price.
          </p>
          <p className="text-sm text-muted-foreground">
            Try: "Add a GM branded t-shirt for $29.99" or "Create a Chevrolet cap for $24.99"
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="metric-card group overflow-hidden"
            >
              {/* Product Image */}
              <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                {product.node.images.edges[0] ? (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {product.node.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.node.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-primary">
                    {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                    {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
