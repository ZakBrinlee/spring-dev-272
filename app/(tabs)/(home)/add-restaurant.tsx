import { Box } from '@/components/ui/box';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import { useNavigation } from 'expo-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { useAddRestaurant } from '@/hooks/useAddRestaurant';

// Validation schema for the restaurant form
const ResturantSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    location: Yup.string().required('Location is required'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required'),
});

const AddRestaurant =() => {
    const navigation = useNavigation();
    const { addRestaurant } = useRestaurantContext();
    return (
        <Box className="flex-1 p-4 dark:bg-neutral-950">
            <Formik
                initialValues={{
                    title: '',
                    location: '',
                    rating: 0,
                }}
                validationSchema={ResturantSchema}
                onSubmit={(values, { resetForm }) => {
                    // Add the restaurant using the context method
                    addRestaurant({
                        title: values.title,
                        location: values.location,
                        rating: values.rating,
                    });

                    // Reset the form
                    resetForm();
                    // Navigate back to the previous screen
                    navigation.goBack();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <Box>
                        {/* Title Input */}
                        <Box className='mb-4'>
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Name</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField 
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                    placeholder='Enter restaurant name'
                                />
                            </Input>
                            {touched.title && errors.title && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.title}</Text>
                            )}
                        </Box>

                        {/* Location Input */}
                        <Box className='mb-4'>
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Location</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField 
                                    onChangeText={handleChange('location')}
                                    onBlur={handleBlur('location')}
                                    value={values.location}
                                    placeholder='Enter the restaurant locaiton'
                                />
                            </Input>
                            {touched.location && errors.location && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.location}</Text>
                            )}
                        </Box>

                        {/* Rating Input */}
                        <Box className='mb-4'>
                            <HStack space="md" className='mb-4 items-center'>
                                <Text size="lg" className='text-stone-900 dark:text-white'>Rating (1-5):</Text>
                                <Text bold size="lg" className='text-stone-900 dark:text-white'>{values.rating || 0}</Text>
                            </HStack>

                            <Box className='flex mx-4'>
                                <Slider
                                    defaultValue={values.rating || 0}
                                    minValue={1}
                                    maxValue={5}
                                    step={1}
                                    onChange={(value) => {
                                        handleChange('rating')(value.toString());
                                    }}
                                    // onBlur={handleBlur('rating')}
                                    value={values.rating || 0}
                                    className='mt-2'
                                    accessibilityLabel="Rating Slider"
                                    accessibilityHint="Slide to select a rating between 1 and 5"
                                    accessibilityRole="adjustable"
                                    accessibilityState={{ selected: values.rating > 0 }}
                                    accessibilityValue={{ min: 1, max: 5, now: values.rating || 0 }}
                                    accessibilityActions={[{ name: 'increment', label: 'Increase rating' }, { name: 'decrement', label: 'Decrease rating' }]}
                                >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb><Text>{values.rating || 0}</Text></SliderThumb>
                            </Slider>
                        </Box>
                        </Box>

                        {/* Submit Button */}
                        <Button action="positive" onPress={() => handleSubmit()} className='mt-4'>
                            <ButtonText>Submit</ButtonText>
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default AddRestaurant;