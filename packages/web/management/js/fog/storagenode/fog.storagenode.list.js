(function($) {
    var deleteSelected = $('#deleteSelected');

    function disableButtons(disable) {
        deleteSelected.prop('disabled', disable);
    }
    function onSelect(selected) {
        var disabled = selected.count() == 0;
        disableButtons(disabled);
    }

    disableButtons(true);
    var table = Common.registerTable($('#dataTable'), onSelect, {
        order: [
            [0, 'asc']
        ],
        columns: [
            {data: 'name'},
            {data: 'storagegroupName'},
            {data: 'isEnabled'},
            {data: 'isMaster'},
            {data: 'maxClients'}
        ],
        rowId: 'id',
        columnDefs: [
            {
                responsivePriority: -1,
                render: function(data, type, row) {
                    return '<a href="../management/index.php?node='+Common.node+'&sub=edit&id='+row.id+'">'+data+'</a>';
                },
                targets: 0
            },
            {
                responsivePriority: 0,
                render: function(data, type, row) {
                    return '<a href="../management/index.php?node=storagegroup&sub=edit&id='+row.storagegroupID+'">'+data+'</a>';
                },
                targets: 1
            },
            {
                render: function(data, type, row) {
                    var enabled = '<span class="label label-success"><i class="fa fa-check-circle"></i></span>';
                    var disabled = '<span class="label label-danger"><i class="fa fa-times-circle"></i></span>';
                    return (data > 0 ? enabled : disabled);
                },
                targets: 2
            },
            {
                render: function(data, type, row) {
                    var enabled = '<span class="label label-success"><i class="fa fa-check-circle"></i></span>';
                    var disabled = '<span class="label label-danger"><i class="fa fa-times-circle"></i></span>';
                    return (data > 0 ? enabled : disabled);
                },
                targets: 3
            }
        ],
        processing: true,
        serverSide: true,
        ajax: {
            url: '../management/index.php?node='+Common.node+'&sub=list',
            type: 'post'
        }
    });

    if (Common.search && Common.search.length > 0) {
        table.search(Common.search).draw();
    }

    deleteSelected.on('click', function() {
        disableButtons(true);
        Common.deleteSelected(table, function(err) {
            // if we couldn't delete the items, enable the buttons
            // as the rows still exist and are selected.
            if (err) {
                disableButtons(false);
            }
        });
    });
})(jQuery);
