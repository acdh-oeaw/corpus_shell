
****************
  corpus_shell
****************


Is a modular framework for publishing (distributed and heterogeneous) language resources.

It consists of self-contained "loosely-coupled" services, with (hopfully) clearly defined tasks and interfaces,
the basic protocol (the linuga franca) being the `FCS/SRU-protocol <http://clarin.eu/fcs>`_, "FCS" standing for federated content search.

We recognize following basic components to the framework:

`Aggregator <https://github.com/acdh-oeaw/fcs-aggregator>`_
    a service that is able to dispatch a query to multiple target repositories, and merge the result back.
    Currently we have a basic php-implementation fcs/aggreagtor/switch.php 
    which however is not yet able to query multiple target repositories at once.
    
`XSL Libraray <https://github.com/acdh-oeaw/cs-xsl>`_
    an XSL library that transfroms the FCS/SRU responses to HTML snippets, HTML pages or other formats like JSON

Wrapper
    services that translate between existing systems and the protocol. Currently we have (in an early dirty version):

      - *php* - `implementations accessing MySQL-db for Dictionaries <https://github.com/acdh-oeaw/mysqlonsru>`_ (Note that there is a `separate project for entering the data into the db <https://github.com/acdh-oeaw/vleserver>`_)
      - *xquery* - `implementation <https://github.com/acdh-oeaw/cr-xq-mets/tree/master/src/modules/fcs>`_ for `eXist-based content repository <https://github.com/acdh-oeaw/cr-xq-mets>`_
      - *perl* implementation mapping to ddc-api (corpus search engine) 
        allowing to access our (public) corpora (not checked in yet)

`Workspace <index.html>`_
    main user-interface allowing to select targets, issues queries, 
    see the results and invoke specialized viewer for the resources.

`ResourceViewer </scripts/js>`_
    separate ui-components that are able to display/visualize specific resource types. 
    (Currently we have only the basic XSL-transformed HTML-views of the results returned by the services)

****************************
How to install this software
****************************

Simple answer
    This is easy if you just want to see what corpus_shell does if you point your browser at it and perhaps change
    some of it's behaviour to your needs by adapting the JavaScript, CSS and perhaps HTML parts: There is nothing to do
    but open index.html right from where you downloaded it. All your settings stay local in your browser and you query
    the publicly available projects at ACDH's server.
    This is also what the gh-pages branch of this repository contains hence you can see a `demo of the interface here <https://acdh-oeaw.github.io/corpus_shell/>`_.
    There is also `source code documentation for this HTML5 part of corpus_shell <https://acdh-oeaw.github.io/corpus_shell/docs>`_ available there.
    
Advanced answer
	If you want to expose your own data to the world then it gets way more complicated. You need a server capable of interpreting
	PHP 5.3 or better and perhaps an exsit-db or mysql/mariadb database for storing and retrieving your data. Detailed instructions
	on how to do such a setup (may) follow (soon). Until then have a look at `this Dockerfile <https://github.com/acdh-oeaw/docker-tools/blob/master/images/corpus_shell/Dockerfile>`_, which contains the automated
	instructions for setting up an instance.

*********
More docs
*********

* `TODO <docs/TODO.md>`_
* `Design <docs/Design.md>`_: A document about design decissions.
