
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Control } from 'react-hook-form';

interface VehicleSpecificationsProps {
  control: Control<any>;
}

const VehicleSpecifications = ({ control }: VehicleSpecificationsProps) => {
  return (
    <div className="bg-muted/50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Especificaciones técnicas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="engine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motor</FormLabel>
              <FormControl>
                <Input placeholder="2.0L Turbocharged I4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmisión</FormLabel>
              <FormControl>
                <Input placeholder="9-Speed Automatic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="fuelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de combustible</FormLabel>
              <FormControl>
                <Input placeholder="Gasoline" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilometraje</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="exteriorColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color exterior</FormLabel>
              <FormControl>
                <Input placeholder="Polar White" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="interiorColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color interior</FormLabel>
              <FormControl>
                <Input placeholder="Black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default VehicleSpecifications;
