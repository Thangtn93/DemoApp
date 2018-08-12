import React, { Component, PropTypes } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

export default class CustomMultiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      searchText: '',
      selected: [],
      list: []
    };
  }

  componentDidMount = () => {
    this.setState({
      list: this.props.options
    })
    const selected = this.props.selected
    if (typeof selected === "object") {
      selected.map(select => {
        this._onSelect(select)
      })
    } else {
      this._onSelect(selected)
    }
  }

  getNewDimensions(event) {
    var pageHeight = event.nativeEvent.layout.height
    var pageWidth = event.nativeEvent.layout.width
    this.setState({
      pageHeight, pageWidth
    })
  }

  _onSelect = (item) => {
    var selected = this.state.selected
    if (this.props.multiple) {
      if (selected.indexOf(item) == -1) {
        selected.push(item)
        this.setState({
          selected: selected
        })
      } else {
        selected = selected.filter(i => i != item)
        this.setState({
          selected: selected
        })
      }
    } else {
      if (selected.indexOf(item) == -1) {
        selected = [item]
        this.setState({
          selected: selected
        })
      } else {
        selected = []
        this.setState({
          selected: selected
        })
      }
    }
    this.props.callback(selected)
  }

  _onSearch = (text) => {
    const searchText = text.length > 0 ? text.toLowerCase() : '';
    this.setState({
      list: this.filterObjectByValue(this.props.options, searchText)
    })
  }

  _isSelected = (item) => {
    const selected = this.state.selected
    if (selected.indexOf(item) == -1) {
      return false
    }
    return true
  }

  filterObjectByValue = (obj, searchText) => {
    return obj.filter(function (el) {
      return el.fullname.toLowerCase().includes(searchText)
    });

  }

  render() {
    // const { options } = this.props;
    // const list = this.state.searchText ? this.filterObjectByValue(options) : options
    // const labels = Object.keys(list).map(i => list[i])
    // const values = Object.keys(list)
    return (
      <View onLayout={(evt) => { this.getNewDimensions(evt) }}>
        <SearchBar
          onSearchChange={(text) => { this._onSearch(text) }}
          height={40}
          onFocus={() => console.log('On Focus')}
          onBlur={() => console.log('On Blur')}
          placeholder={'Search...'}
          autoCorrect={false}
          padding={5}
          returnKeyType={'search'}
          alwaysShowBackButton={true}
        />
        <ScrollView
          style={[{ padding: 5 }, this.props.scrollViewStyle]}
        >
          {this.state.list.map((item) => {
            // const itemKey = returnValue == "label" ? label : values[index]
            return (
              <TouchableOpacity
                key={Math.round(Math.random() * 1000000)}
                style={[{
                  padding: 7,
                  marginTop: 0,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: 6,
                  backgroundColor: this.props.rowBackgroundColor,
                  height: this.props.rowHeight,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: this.props.rowRadius
                },
                this.props.itemStyle
                ]}
                onPress={() => {
                  this._onSelect(item.UID)
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: 'http://thuthuat123.com/uploads/2018/01/27/avatar-dep-nhat-2_112147.jpg' }}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                  <Text style={{
                    paddingLeft: 10,
                  }}>{item.fullname}</Text>
                </View>
                {

                  this._isSelected(item.UID) ?
                    <Icon name={this.props.selectedIconName}
                      style={[{ color: this.props.iconColor, fontSize: this.props.iconSize }, this.props.selectedIconStyle]}
                    />
                    :
                    <Icon name={this.props.unselectedIconName}
                      style={[{ color: this.props.iconColor, fontSize: this.props.iconSize }, this.props.unselectedIconStyle]}
                    />
                }
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}