"use client";

import { useState } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils/formatters";
import { ProductCategory, Network } from "@/types/api";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: undefined as ProductCategory | undefined,
    network: undefined as Network | undefined,
  });

  const { data: productsData, isLoading } = useProducts({
    ...filters,
    is_active: true,
  });
  const products = productsData?.results ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-navy">Products</h1>
          <p className="text-gray-600 mt-1">View available data plans and airtime configurations</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={[
                { value: "", label: "All" },
                { value: ProductCategory.DATA, label: "Data" },
                { value: ProductCategory.AIRTIME, label: "Airtime" },
              ]}
              value={filters.category || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value ? (e.target.value as ProductCategory) : undefined,
                })
              }
            />

            <Select
              label="Network"
              options={[
                { value: "", label: "All" },
                { value: Network.MTN, label: "MTN" },
                { value: Network.GLO, label: "Glo" },
                { value: Network.AIRTEL, label: "Airtel" },
                { value: Network.NINEMOBILE, label: "9mobile" },
              ]}
              value={filters.network || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  network: e.target.value ? (e.target.value as Network) : undefined,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No products found
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant={product.is_active ? "success" : "default"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium">{product.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                    {product.size && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{product.size}</span>
                      </div>
                    )}
                    {product.validity && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Validity:</span>
                        <span className="font-medium">{product.validity}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-lg font-bold text-primary-deep">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
