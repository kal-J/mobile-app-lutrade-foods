import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Left, Text, Icon, Button } from 'native-base';
import FiveStarRating from './FiveStarRating';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/mapStateToProps';
import { setVendor } from '../redux/actions';

const Vendor = (props) => {
  const { setVendor } = props;

  return (
    <Card>
      <TouchableOpacity
        onPress={() => {
          // on Vendor selection, we need to set menuList items in redux state
          // i.e i the vendor object

          // set vendor in state
          setVendor(props.vendor);

          props.navigation.navigate({
            routeName: 'Menu',
            params: {
              name: props.vendorName,
              image: props.image,
              rating: props.rating,
            },
          });
        }}
      >
        <CardItem cardBody>
          <Image
            source={{uri: props.image}}
            style={{ height: props.height || 200, width: '100%' }}
          />
        </CardItem>
      </TouchableOpacity>

      <CardItem style={{ margin: 0, padding: 0 }}>
        <Left>
          <Text>{props.vendorName}</Text>
        </Left>
      </CardItem>
      <FiveStarRating rating={props.rating} />
    </Card>
  );
};

export default connect(
  mapStateToProps,
  { setVendor }
)(Vendor);
