# jQuery.formData

Rails like html form serializer.

Assume that there are following HTML elements:

```html
<form id="item_form">
  <input name="token" value="TOKEN"/>
  <input name="item[title]" value="Title"/>
  <input name="item[tag_data][names][]" value="Ruby"/>
  <input name="item[tag_data][versions][]" value="2.0.0"/>
  <input name="item[tag_data][names][]" value="Vim"/>
  <input name="item[tag_data][versions][]" value=""/>
</form>
```

As you know, general web frameworks, including Rails, convert submitted data to a hash object such as:

```rb
params[:token]
#=> 'TOKEN'
params[:item][:title]
#=> 'Title'
params[:item][:tag_data]
#=> { names: ['Ruby', 'Vim'], versions: ['2.0.0', ''] }
```

jQuery.formData is a simple jQuery plugin for converting the data of a form element into an JavaScript object in the same manner.

```js
var params = $('#item_form').formData();
params['token']
//=> 'TOKEN'
params['item']['title']
//=> 'Title'
params['item']['tag_data']
//=> { names: ['Ruby', 'Vim'], versions: ['2.0.0', ''] }
```

# Sample

By using the result, you can easily create an backbone model instance.

```js
$('#item_form').on('submit', function (e) {
  e.preventDefault();
  myBackboneCollection.ceate(this.formData());
});
```
