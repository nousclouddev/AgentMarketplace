
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  'All',
  'Data Analysis',
  'Customer Service',
  'Content Creation',
  'Marketing',
  'Development',
  'Finance',
  'Sales'
];

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}: SearchAndFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#f8fafc] border border-[#64748B] text-[#22223b] placeholder:text-[#64748B] focus-visible:ring-2 focus-visible:ring-[#64748B] shadow-md hover:shadow-lg transition-all"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 transition-colors border-none">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#64748B]">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-[#64748B] hover:bg-[#f1f5f9] hover:text-[#22223b]">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
