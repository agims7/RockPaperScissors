var list = document.getElementById('Lista');
var add = document.getElementById('addElem');
var count = document.getElementsByTagName('li').length;

add.addEventListener('click', function() {
	list.innerHTML += '<li>item ' + count + '</li>'
	count++;
});
