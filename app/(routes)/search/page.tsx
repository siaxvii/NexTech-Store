import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import Filter from '../category/[categoryId]/components/filter';
import Sort from '../category/[categoryId]/components/sort';

export const revalidate = 0;

interface SearchPageProps {
  
}

const SearchPage: React.FC<SearchPageProps> = async ({ 
  
}) => {
  const products = await getProducts({ 
    
  });
  const colors = await getColors();
  


  return (
    <div className="bg-white">
      <Container>
        
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
              <h3 className="text-lg font-semibold"> Prices </h3>
              <hr className="my-4" />
              <Sort
                sortByOptions={[
                  { label: 'Lowest to Highest', value: 'asc' },
                  { label: 'Highest to Lowest', value: 'desc' },
                ]}
              />
            
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;