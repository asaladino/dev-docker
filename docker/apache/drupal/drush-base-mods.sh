#!/usr/bin/env bash

# Provision Drupal

modules_list=(
    admin_menu
    admin_path
    admin_views
    apachesolr
    better_exposed_filters
    cacheexclude, calendar
    ckeditor
    colorbox
    conditional_fields
    css_injector
    ctools
    date
    devel
    email
    entity
    entitycache
    entityreference
    expire
    fapi_validation
    features
    features_extra
    feeds
    field_collection
    field_collection_deploy
    field_formatter_class
    field_formatter_settings
    field_group
    field_jquery_tabs
    field_validation
    fieldable_panels_panes
    file_entity
    filefield_paths
    filefield_sources
    filter_perms
    finder
    flag
    google_analytics
    htmlmail
    icon
    image_link_formatter
    job_scheduler
    jquery_update
    js_injector
    ldap
    libraries
    link
    linked_field
    mailsystem
    masquerade
    media
    memcache
    menu_attributes
    menu_editor
    metatag
    mimemail
    modal_forms
    module_filter
    multiselect
    node_clone
    node_export
    oauth
    page_title
    panelizer
    panels
    password_policy
    path_breadcrumbs
    pathauto
    phone
    phpexcel
    quicktabs
    redirect
    rules
    schema
    search_api
    serial
    services
    services_views
    simple_dialog
    stage_file_proxy
    strongarm
    title
    token
    uuid
    varnish
    views
    webform
    workbench
    wysiwyg
    xautoload
    xmlsitemap
)

cd "/var/www/html"

echo "Downloading Modules..."
drush dl ${#modules_list[@]} -y