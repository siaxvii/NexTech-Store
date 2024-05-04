import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import Sort from './components/sort';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sortBy: 'asc' | 'desc';
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ 
  params, 
  searchParams
}) => {
  const products = await getProducts({ 
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sortBy: searchParams.sortBy,
  });
  const colors = await getColors();
  const category = await getCategory(params.categoryId);


  return (
      <Container>
        <div tabIndex={0}>
          <span className="sr-only">Category </span>
          <Billboard 
            data={category.billboard}
          />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters colors={colors} />
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold" tabIndex={0} aria-label="Filters. Sort Price"> Sort Price </h3>
              <hr className="my-4" />
              <Sort
                sortByOptions={[
                  { label: 'Lowest to Highest', value: 'asc' },
                  { label: 'Highest to Lowest', value: 'desc' },
                ]}
              />
              <div className="pt-10" tabIndex={0} aria-label="Color Filters">
                <Filter 
                  valueKey="colorId" 
                  name="Colors" 
                  data={colors}
                />
              </div>
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
  );
};

export default CategoryPage;