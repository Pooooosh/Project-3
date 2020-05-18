jQuery(document).ready(function($){
    $('#book-list').html('Loading...');

    function createBookItem(book){

        var $li = $('<li>');
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title);
        $li.data('bookId', book.id);
        return $li;
    }

    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function(response){
        $('#book-list').html('');
        response.data.forEach(function(book){
            $('#book-list').prepend(createBookItem(book));
        });
        $('.list-group-item').on('click', function(){
            $('.list-group-item').removeClass('active');
            var bookID = $(this).data('bookId');
            $(this).addClass('active');
            $('#cover').html('Loading...');
            axios.get('http://csc225.mockable.io/books/' + bookID).then(function(response){
                $('#cover').html('');
                console.log(response);
                $('#cover').html(BookData(response.data));
            });
        });
    });

    function BookData(book)
    {
        var $card = $('<div>').addClass('card');
        var $cardBody = $('<div>').addClass('card-body');
        var $img = $('<img>').attr('src', book.cover).attr('alt', 'book').attr('width','50').attr('height', '450').addClass('card-img-top');

        $card.append($img);
        $cardBody.append('<h5 class="card-title">'+ book.title +'</h5>');
        $cardBody.append('<p class="card-text">Author: '+ book.author +'</p>');
        $cardBody.append('<p class="card-text">Pages: '+ book.pages +'</p>');
        $cardBody.append('<p class="card-text">Year: '+ book.year +'</p>');
        $cardBody.append('<p class="card-text">Country: '+ book.country +'</p>');
        $cardBody.append('<p class="card-text">Language: '+ book.language +'</p>');
        $cardBody.append('<a href ="'+ book.link +'"> Link to Wiki page </a>');
        $card.append($cardBody);
        $('#cover').html($card);

    }
});