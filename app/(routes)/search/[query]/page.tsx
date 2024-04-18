import Container from '@/components/ui/container';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getColors from '@/actions/get-colors';

import Filter from '../../category/[categoryId]/components/filter';
import MobileFilters from '../../category/[categoryId]/components/mobile-filters';
import Sort from '../../category/[categoryId]/components/sort';
import { Product } from '@/types';

export const revalidate = 0;

interface SearchPageProps {
  params:{ 
    query: string;
  }
  searchParams: {
    colorId: string;
    sortBy: 'asc' | 'desc';
    search: string;
  }
}

const SearchPage: React.FC<SearchPageProps> = async ({ 
  params,
  searchParams
}) => {

  const decodedQuery = decodeURIComponent(params.query);

  const products = await getProducts({ 
    search: params.query,
    colorId: searchParams.colorId,
    sortBy: searchParams.sortBy,
  });

  const colors = await getColors();


  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-10">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters colors={colors} />
            <div className="pt-10 hidden lg:block">
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

            <h3 className="font-semibold text-3xl my-10"> 
              {products.length === 1 ? `${products.length} search result` : `${products.length} search results`} for `&quot;`{decodedQuery}`&quot;`
            </h3>
              {!products || products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.map((product:Product) => (
                  <ProductCard key={product.id} data={product} />
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