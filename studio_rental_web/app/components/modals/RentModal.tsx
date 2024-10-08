'use client';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from './Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

// Step enumeration
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset    
    } = useForm<FieldValues>({
        defaultValues: {
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
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    // Function to set custom form values
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const onBack = () => setStep((value) => value - 1);
    const onNext = () => setStep((value) => value + 1);

    // Form submission handling
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Action labels for buttons
    const ActionLabel = useMemo(() => (step === STEPS.PRICE ? 'Create' : 'Next'), [step]);
    const SecondaryActionLabel = useMemo(() => (step === STEPS.CATEGORY ? undefined : 'Back'), [step]);

    // Dynamic body content based on the current step
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
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
                <Heading title='Where is your place located?' subtitle='Help guests find you! Pick a location' />
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Share some basic details about the place' subtitle='What amenities do you have?' />
                <Counter title='Guest' subtitle='How many guest members do you allow?' value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} />
                <hr />
                <Counter title='Room' subtitle='How many rooms do you have?' value={roomCount} onChange={(value) => setCustomValue('roomCount', value)} />
                <hr />
                <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" />
                <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
                <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
            </div>
        );
    }

    if (step === STEPS.PRICE) { 
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
                <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={ActionLabel}
            secondaryActionLabel={SecondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Home"
            body={bodyContent}
        />
    );
};

export default RentModal;
