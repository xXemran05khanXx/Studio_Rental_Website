'use client'
import { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal';
import Heading from './Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';



enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset    
    } = useForm<FieldValues>({
         defaultValues :{
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
         }
    });
    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    const Map = useMemo(()=>dynamic(() => import('../Map'),
     { ssr: false }), [location]);

    const setCustomValue =  ( id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const ActionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    },[step]);

    const SecondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon} 
                />
              </div>
            ))}
          </div>
        </div>
      );

      if (step === STEPS.LOCATION) {
        bodyContent = (
         <div className='flex flex-col gap-8'>
          <Heading 
            title='Where is your place located?'
            subtitle='Help guest find you! Pick a location'
          />
          <CountrySelect 
            value={location}
            onChange={ (value) => setCustomValue('location', value)} 
          />
          <Map
            center={location?.latlng} />
         </div> 
        )
      }

      if (step === STEPS.INFO) {
        bodyContent = (
          <div 
            className='flex flex-col gap-8'
          >
            <Heading
              title='Share some basics detail about place'
              subtitle='What amenities do you have'
            />

          <Counter
              title='Guest'
              subtitle='How many guest member do you allow'
              value={guestCount}
              onChange={(value => setCustomValue('guestCount', value))}
          />
          <hr/>
          <Counter
              title='Room'
              subtitle='How many Room do you have'
              value={roomCount}
              onChange={(value => setCustomValue('roomCount', value))}
          />     
          <hr/>      
          <Counter
            title='Bathrooms'
            subtitle='How many bathrooms do you have'
            value={bathroomCount}
            onChange={(value => setCustomValue('bathroomCount', value))}
          />
          </div>
        )
      }
      

  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={onNext}
    actionLabel={ActionLabel}
    secondaryActionLabel={SecondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title="Home"
    body={bodyContent}
    />
  );
}

export default RentModal